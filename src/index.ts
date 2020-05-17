import { getDoc } from "./firebase";

const measure = async (heavyFunc: () => void, logPrefix?: string) => {
  const start = new Date().getTime();
  await heavyFunc();
  const end = new Date().getTime();
  console.log(logPrefix || "time: ", end - start);
};

const getAllItems = async (itemIds: string[]) => {
  await Promise.all(
    itemIds.map(async itemId => await getDoc("/items", itemId))
  );
};
/*
const itemIds = ["A", "B", "C"];
;
sortBy(itemIds,"")
*/

const main = async () => {
  console.log("hello ts-performance");

  const getItem = async () => {
    const a = await getDoc("/items", "A");
    console.log(a);
  };

  measure(getItem, "getItem: ");
};
main();
