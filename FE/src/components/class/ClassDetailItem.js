import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Card, CardContent } from "@mui/material";

import "./ClassDetailItem.css";

function ClassDetailItem() {
  const img =
    "https://item.kakaocdn.net/do/a1bfdf9838f7767f429015f6564cb234f43ad912ad8dd55b04db6a64cddaf76d";
  const content = `
        아
        아아아
        아아
        아
        아
        아
        아
        앙
        ㅏㅇ
        ㅏㅇ
        ㅏㅇㅏㅇ
        ㅏ
    `;

  return (
    <Box>
      <Card>
        <CardContent>
          <img src={img}></img>
        </CardContent>
      </Card>

      <Card>
        <CardContent>{content}</CardContent>
      </Card>
    </Box>
  );
}

export default ClassDetailItem;
