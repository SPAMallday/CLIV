import React from "react";
import ClassDetailInfo from "../../components/class/ClassDetailInfo";
import ClassDetailItem from "../../components/class/ClassDetailItem";
import QnaItem from "../../components/qna/QnaItem";

const ClassDetail = () => {
  return (
    <div>
      <ClassDetailInfo />
      <QnaItem />
      <ClassDetailItem />
    </div>
  );
};

export default ClassDetail;
