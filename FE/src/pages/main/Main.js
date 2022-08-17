import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ClassThumbnailList from '../../components/main/ClassThumbnailList';

import { mainList } from '../../api/mainAPI';
import { styled } from '@mui/material';

const MainListTitle = styled(Typography)({
  align: 'left',
  color: 'text.primary',
  gutterBottom: true,
  fontSize: '1.7rem',
  fontWeight: '700',
});

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
          <Box sx={{ py: 2 }}>
            <MainListTitle>마감 임박 클래스</MainListTitle>
            <ClassThumbnailList value={hcList} />
          </Box>
          <Box sx={{ py: 2 }}>
            <MainListTitle>곧 시작하는 클래스</MainListTitle>
            <ClassThumbnailList value={ctList} />
          </Box>
          <Box sx={{ py: 2 }}>
            <MainListTitle>추천 클래스</MainListTitle>
            <ClassThumbnailList value={allList} />
          </Box>
        </Container>
      </Box>
    </main>
  );
}
export default Main;
