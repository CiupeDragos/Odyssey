import React, { ReactNode } from "react";
import { ThreadType } from "./enums";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Colors } from "./constants";

export function getThreadTypeIcon(type: ThreadType) {
  if (type === ThreadType.DISCUSSION) {
    return <Entypo name="chat" size={24} color={Colors.primary} />;
  } else if (type === ThreadType.QUESTION) {
    return <AntDesign name="questioncircle" size={24} color={Colors.primary} />;
  }
}
