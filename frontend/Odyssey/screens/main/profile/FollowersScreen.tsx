import { useNavigation, useRoute } from "@react-navigation/native";
import FollowersList from "../../../components/main/profile/FollowersList";
import {
  FollowersNavProp,
  FollowersRouteProp,
} from "../../../types/navigation";
import { useContext, useLayoutEffect } from "react";
import { MainContext } from "../../../store/MainContext";

function FollowersScreen() {
  const mainContext = useContext(MainContext);
  const route = useRoute<FollowersRouteProp>();
  const navigation = useNavigation<FollowersNavProp>();
  const followers = route.params.followers;
  const username =
    mainContext.userData!!.username === route.params.username
      ? "Your profile"
      : route.params.username;

  useLayoutEffect(() => {
    navigation.setOptions({ headerBackTitle: username });
  }, []);

  return <FollowersList followers={followers} />;
}

export default FollowersScreen;
