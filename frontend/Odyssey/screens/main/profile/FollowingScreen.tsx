import { useRoute, useNavigation } from "@react-navigation/native";
import { useContext, useLayoutEffect } from "react";
import FollowersList from "../../../components/main/profile/FollowersList";
import {
  FollowingNavProp,
  FollowingRouteProp,
} from "../../../types/navigation";
import { MainContext } from "../../../store/MainContext";

function FollowingScreen() {
  const mainContext = useContext(MainContext);
  const route = useRoute<FollowingRouteProp>();
  const navigation = useNavigation<FollowingNavProp>();
  const following = route.params.following;
  const username =
    mainContext.userData!!.username === route.params.username
      ? "Your profile"
      : route.params.username;

  useLayoutEffect(() => {
    navigation.setOptions({ headerBackTitle: username });
  }, []);

  return <FollowersList followers={following} />;
}

export default FollowingScreen;
