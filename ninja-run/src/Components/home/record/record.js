import "./record.css";

import { getTop10Records } from "../../../api/recordApi";

function getRecordHTML(records) {
  return `
    <div class="records__container">
      <div class="title">
        Record!
      </div>
      <div class="records" id="records">
        ${records}
      </div>
    </div>
  `;
}

function makeRecordDiv(rank, name, score) {
  return `
    <div class="record">
      <div class="record__rank">
        ${rank + 1}
      </div>
      <div class="record__name">
        ${name}
      </div>
      <div class="record__score">
        ${score}
      </div>
    </div>
  `;
}

export default async () => {
  const top10Records = await getTop10Records();

  const top10RecordsDiv = top10Records.records.map((record, i) => {
    return makeRecordDiv(i, record.name, record.score);
  });

  return getRecordHTML(top10RecordsDiv.join(""));
};
