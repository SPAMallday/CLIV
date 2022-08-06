import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Card, CardContent } from "@mui/material";
import { Stack } from "@mui/material";

import "./ClassDetailItem.css";

function ClassDetailItem() {
  const img =
    "https://item.kakaocdn.net/do/a1bfdf9838f7767f429015f6564cb234f43ad912ad8dd55b04db6a64cddaf76d";
  const content = `
  국가는 모성의 보호를 위하여 노력하여야 한다. 군인은 현역을 면한 후가 아니면 국무위원으로 임명될 수 없다. 국가는 농·어민과 중소기업의 자조조직을 육성하여야 하며, 그 자율적 활동과 발전을 보장한다.

  혼인과 가족생활은 개인의 존엄과 양성의 평등을 기초로 성립되고 유지되어야 하며, 국가는 이를 보장한다. 모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다.
  
  지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다. 대통령은 국회에 출석하여 발언하거나 서한으로 의견을 표시할 수 있다.
  
  국가는 균형있는 국민경제의 성장 및 안정과 적정한 소득의 분배를 유지하고, 시장의 지배와 경제력의 남용을 방지하며, 경제주체간의 조화를 통한 경제의 민주화를 위하여 경제에 관한 규제와 조정을 할 수 있다.
  
  국가안전보장회의는 대통령이 주재한다. 대법관은 대법원장의 제청으로 국회의 동의를 얻어 대통령이 임명한다. 일반사면을 명하려면 국회의 동의를 얻어야 한다.
  
  누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다. 다만, 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다.
  
  국토와 자원은 국가의 보호를 받으며, 국가는 그 균형있는 개발과 이용을 위하여 필요한 계획을 수립한다. 국정감사 및 조사에 관한 절차 기타 필요한 사항은 법률로 정한다.
  
    `;

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <img src={img} style={{ width: "100%" }}></img>
        </CardContent>
      </Card>

      <Card>
        <CardContent>{content}</CardContent>
      </Card>
    </Stack>
  );
}

export default ClassDetailItem;
