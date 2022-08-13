export const getClassList = (rawData) => {
  return rawData.map({
    classId,
    teacherId,
    members,
    categoryId,
    className,
    price,
    headCount,
    classDateTime,
    content,
    classImg,
    classStatus,
    level,
    regdate,
  });
};
