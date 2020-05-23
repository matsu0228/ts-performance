import { getDoc, getDocs, getFirebaseDocFromCache } from "./firebase";

import { sortBy } from "lodash";

const itemIds = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",

  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",

  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",

  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",

  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",

  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
  "100"
];

const measure = async (heavyFunc: () => void, logPrefix?: string) => {
  const start = new Date().getTime();
  await heavyFunc();
  const end = new Date().getTime();
  console.log(logPrefix || "time: ", end - start, " [ms]");
};
const wait = async (time: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

const renderMock = async (list: any[]) => {
  if (!list?.length) {
    return;
  }
  await wait((list.length / 100) * 1000); // 100要素あたり1sec
};

const getItemsByIdsAsync = async (itemIds: string[]) => {
  return await Promise.all(
    itemIds.map(async itemId => await getDoc("/items", itemId))
  );
};
const getItemsByIds = async (itemIds: string[]) => {
  const items: any[] = [];
  for (const id of itemIds) {
    const item = await getDoc("/items", id);
    items.push(item);
  }
  return items;
};
const getItemsByIdsWithCache = async (itemIds: string[]) => {
  const items: any[] = [];
  for (const id of itemIds) {
    const item = await getFirebaseDocFromCache("/items", id);
    items.push(item);
  }
  return items;
};

const single = () => {
  const getItem = async () => {
    const a = await getDoc("/items", "21");
    await renderMock([a]);
  };
  measure(getItem, "getItem: ");
};
const fromCache = (isList: boolean) => {
  const getItem = async () => {
    const a = await getFirebaseDocFromCache("/items", "21");
    await renderMock([a]);
  };
  const getItemList = async () => {
    const list = await getItemsByIdsWithCache(itemIds);
    await renderMock(list);
  };
  measure(isList ? getItemList : getItem, "getItemCache: ");
};

const list = (isAsync: boolean) => {
  const getItemList = async () => {
    const list = isAsync
      ? await getItemsByIdsAsync(itemIds)
      : await getItemsByIds(itemIds);
    await renderMock(list);
  };
  measure(getItemList, isAsync ? "getItemListAsync" : "getItemList: ");
};

const query = () => {
  const getItemList = async () => {
    const list = await getDocs("/items");
    await renderMock(list);
  };
  measure(getItemList, "query: ");
};

const sort = () => {
  const sortItemList = async () => {
    const itemList = itemIds.map(id => ({ id, name: "hoge" }));
    sortBy(itemList, ["id"]);
  };
  measure(sortItemList, "sort: ");
};
const main = async () => {
  single();
  sort();
  /*
  fromCache(true);
  await wait(1000);
  fromCache(true);
*/

  /*
  query();
  list(true);
  list(false);


getItem:  418  [ms]
getItemCache:  23325  [ms]
getItemCache:  23178  [ms]
*/
};
main();
