import React from "react";
import { Redirect, useParams } from "react-router-dom";
import "./Profile.scss"

import ThoughtList from "../components/ThoughtList";
import FriendList from "../components/FriendList";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { ADD_FRIEND } from "../utils/mutations";
import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const [addFriend] = useMutation(ADD_FRIEND);

  const [me, setMe] = React.useState()
  const { loading: loadingMe, data: meData } = useQuery(QUERY_ME)

  React.useMemo(() => {
    if (meData && meData.me) {
      setMe(meData.me)
    }
  }, [meData])

  // if there is a value in userParam from the URL bar, that value is used to run the QUERY_USER query
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  // if useQuery runs QUERY_USER, it will return data in the user property; if use Query runs QUERY_ME, it will return data in the me property
  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        <br></br>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      const { data } = await addFriend({
        variables: { id: user._id },
      });

      setMe(data.addFriend)
    } catch (e) {
      console.error(e);
    }
  };

  function isFriendsWith(user) {
    let match = me.friends.filter((friend) => friend.username === user)
    if (match.length > 0) {
      return true
    }

    return false
  }

  return (
    <div className="profile">
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : "your"} profile 🚀
        </h2>
        {userParam && me && !isFriendsWith(user.username) && (
          <button className="btn ml-auto friend-btn" onClick={handleClick}>
            Add Friend
          </button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList className="thoughtlist"
            thoughts={user.thoughts}
            title={`${user.username}'s comments:`}
          />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
