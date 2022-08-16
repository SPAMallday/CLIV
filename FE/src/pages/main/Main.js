import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ClassThumbnailList from '../../components/main/ClassThumbnailList';

import { mainList } from '../../api/mainAPI';

function Main() {
  // const [class, setClass] = useState(null);
  // const { count } = useSelector((state) => state.counter);

  const [ctList, setCTList] = useState([]);
  const [hcList, setHCList] = useState([]);
  const [allList, setAllList] = useState([]);

  useEffect(() => {
    mainList().then((res) => {
      setCTList(res.classTimeCL);
      setHCList(res.headcountCL);
      setAllList(res.all);
    });
  }, []);

  return (
    <main>
      {/* Hero unit */}
      <Box sx={{ pt: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ py: 4 }}>
            <Typography
              component="h4"
              variant="h4"
              align="left"
              color="text.primary"
              gutterBottom
            >
              마감 임박 클래스
            </Typography>
            <ClassThumbnailList value={hcList} />
          </Box>
          <Box sx={{ py: 4 }}>
            <Typography
              component="h4"
              variant="h4"
              align="left"
              color="text.primary"
              gutterBottom
            >
              곧 시작하는 클래스
            </Typography>
            <ClassThumbnailList value={ctList} />
          </Box>
          <Box sx={{ py: 4 }}>
            <Typography
              component="h4"
              variant="h4"
              align="left"
              color="text.primary"
              gutterBottom
            >
              추천 클래스
            </Typography>
            <ClassThumbnailList value={allList} />
          </Box>
        </Container>
      </Box>
    </main>
  );
}
export default Main;
