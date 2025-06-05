import { useState } from "react";
import { View, Text, Pressable } from "react-native";
let MyData = [
  "khushi",
  "manas",
  "sachin",
  "mishti",
  "ivanka",
  "siddhi",
  "siddharth",
  "nancy",
  "john",
  "jane smith",
  "jane",
  "johnny",
  "jane doe",
  "alice",
  "bob",
  "charlie",
  "dave",
  "eve",
  "frank",
  "grace",
  "heidi",
  "ivan",
  "judy",
  "kathy",
  "lisa",
  "mike",
  "nina",
  "oliver",
  "paul",
  "quinn",
  "rachel",
  "sara",
  "tom",
  "uma",
  "vicky",
  "will",
  "xander",
  "yara",
  "zara",
  "aaron",
  "bella",
  "carl",
  "diana",
  "ella",
  "fred",
  "george",
  "hannah",
  "ian",
  "james",
  "karen",
];

const itemsPerPage = 5;
const pageBlockSize = 5;
const noOfPages = MyData.length / itemsPerPage; //10
export default function Hello() {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentBlock, setCurrentBlock] = useState(0);

  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = MyData.slice(start, end);

  const getPageNumbers = () => {
    const pages = [];
    const startPage = currentBlock * pageBlockSize;
    const endPage = Math.min(startPage + pageBlockSize, noOfPages);

    for (let i = startPage; i < endPage; i++) {
      pages.push(i);
    }
    console.log(pages);
    return pages;
  };

  const nextBlock = () => {
    const maxBlock = Math.floor((noOfPages - 1) / pageBlockSize);
    if (currentBlock < maxBlock) {
      setCurrentBlock(currentBlock + 1);
      setCurrentPage((currentBlock + 1) * pageBlockSize);
    }
  };

  const prevBlock = () => {
    if (currentBlock > 0) {
      setCurrentBlock(currentBlock - 1);
      setCurrentPage((currentBlock - 1) * pageBlockSize);
    }
  };

  const handlePageClick = (pageIndex: any) => {
    console.log("Page clicked:", pageIndex);
    setCurrentPage(pageIndex);
  };

  return (
    <MainContainer className="mt-10 flex-1 items-center justify-center px-4">
      <Text className="mb-2 text-base">
        Page {currentPage + 1} of {noOfPages}
      </Text>

      <NameContainer className="mb-4 w-full items-center rounded-md bg-green-200 p-4">
        {currentItems.map((item, index) => (
          <Text className="py-1 text-base" key={index}>
            {item}
          </Text>
        ))}
      </NameContainer>

      <PageContainer className="mb-4 flex-row flex-wrap items-center justify-center">
        {currentBlock > 0 && (
          <Pressable
            className="mb-2 mr-2 rounded bg-blue-500 px-4 py-2"
            onPress={prevBlock}
          >
            <Text className="text-white">Back</Text>
          </Pressable>
        )}

        {getPageNumbers().map((page) => (
          <Pressable
            key={page}
            className={[
              "m-1 rounded border px-3 py-2",
              page === currentPage
                ? "border-blue-500 bg-blue-500"
                : "border-gray-300 bg-white",
            ].join(" ")}
            onPress={() => handlePageClick(page)}
          >
            <Text
              className={[
                "text-base",
                page === currentPage ? "text-white" : "text-black",
              ].join(" ")}
            >
              {page + 1}
            </Text>
          </Pressable>
        ))}

        {(currentBlock + 1) * pageBlockSize < noOfPages && (
          <Pressable
            className="mb-2 mr-2 rounded bg-blue-500 px-4 py-2"
            onPress={nextBlock}
          >
            <Text className="text-white">Next</Text>
          </Pressable>
        )}
      </PageContainer>
    </MainContainer>
  );
}

const MainContainer = View;
const NameContainer = View;
const PageContainer = View;
