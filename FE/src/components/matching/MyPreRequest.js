import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { myPreReq } from '../../api/matchingAPI';
import { useSelector } from 'react-redux';
import RequestModal from '../modal/RequestModal';

import './MyPreRequest.css';

function MyPreRequest() {
  const [openDetail, setOpenDetail] = useState(false);
  const [transItem, setTransItem] = useState(null);
  const userId = useSelector((state) => state.userInfo.user.id);
  const [mList, setMList] = useState([]);
  const [data, setData] = useState([
    {
      category: '가죽공예1',
      desc: '가죽으로 DB를 만들고 싶어요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ',
      date: '2022.07.23',
    },
    {
      category: '가죽공예2',
      desc: '가죽으로 DB를 만들고 싶어요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ',
      date: '2022.07.23',
    },
    {
      category: '가죽공예3',
      desc: '가죽으로 DB를 만들고 싶어요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ',
      date: '2022.07.23',
    },
  ]);

  const handleState = (data) => {
    setOpenDetail(data);
  };

  const clickItem = (item) => {
    setOpenDetail(true);
    setTransItem(item);
  };

  useEffect(() => {
    myPreReq(userId).then((res) => {
      setMList(res);

      console.log(userId);
      console.log(res);
    });
  }, []);

  return (
    <>
      <Typography className="miniTitle" sx={{ mt: 3 }}>
        나의 이전 요청
      </Typography>
      <Grid container>
        {mList.map((item) => (
          // return (
          <Grid item key={item.id} xs sm={6} lg={4}>
            <Box className="myPreMatchingBox" style={{ whiteSpace: 'nowrap' }}>
              <Box
                className="myPreMatching"
                component="div"
                sx={{ textOverflow: 'ellipsis' }}
              >
                {item.categoryContent}
              </Box>
              <Box
                className="myPreMatching"
                component="div"
                sx={{ textOverflow: 'ellipsis' }}
              >
                {item.title}
              </Box>
              <Box
                className="myPreMatching"
                component="div"
                sx={{ textOverflow: 'ellipsis' }}
              >
                요청일 : {item.regDate.slice(0, 10)}
              </Box>
              <Button variant="contained" color="secondary">
                <Typography
                  onClick={(event) => {
                    clickItem(item);
                  }}
                  fontWeight={700}
                  fontSize={'0.9rem'}
                >
                  요청 자세히 보기
                </Typography>
              </Button>
            </Box>
          </Grid>
          // );
        ))}
      </Grid>
      <RequestModal
        handleState={handleState}
        openDetail={openDetail}
        transItem={transItem}
      />
    </>
  );
}

export default MyPreRequest;
