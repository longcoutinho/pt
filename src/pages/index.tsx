import { PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import { Box, Button, Input } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import TitleContent from "@/components/TitleContent";
import Image from "@/components/Image";

interface Post {
  image: String,
  title: String,
  author: String,
  createTime: String,
}

export default function Home() {
  //datas
  const listFeaturedNews = [
    "Bài viết 1",
    "Bài viết 2",
    "Bài viết 3",
    "Bài viết 4",
    "Bài viết 5",
  ];
  const listPaginatorPosts = [
    "Bài viết 1",
    "Bài viết 1",
    "Bài viết 2",
    "Bài viết 3",
    "Bài viết 4",
    "Bài viết 5",
  ]
  //components
  const ListFeaturedNews = () => {
    const arr = listFeaturedNews.map((content, index) => (
      <SwiperSlide key={index} className="swiper-slide-featured-news">
        {content}
      </SwiperSlide>
    ));
    return (
      <Box
        className="list-featured-news full-width"
        sx={{
          height: "70%",
        }}
      >
        <Swiper
          className="swiper-featured-news"
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={100}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper: any) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {arr}
          ...
        </Swiper>
      </Box>
    );
  };
  const SearchInput = () => {
    return (
      <Box
        className= "search-input full-width center flex-row"
        sx={{
          height: '100px',
        }}
      >
        <Input sx={{}}></Input>
        <Button>Tìm kiếm</Button>
      </Box>
    );
  };
  const ListPaginatorPosts = () => {
    const listPostJSX = listPaginatorPosts.map((post) => (
      <Box
        className="list-paginator-posts full-width"
        sx={{
          height: '266px',
          border: '2px solid #8F0101',
          marginTop: '100px',
        }}
      >
        <p>{post}</p>
      </Box>
    ))
    return (
      <Box
          className="wrap-list-paginator-posts full-width flex-col"
          sx={{
            height: 'auto',
            marginTop: '100px',
            borderTop: '2px solid #8F0101'
          }}
      >
        {listPostJSX}
      </Box>
    )
  }
  return (
    <Page title={PAGE_TITLE.HOME}>
      <Box className="content full-width flex-col">
        <Box
          className="header-content full-width flex-col"
          sx={{
            height: '600px',
            borderBottom: "2px solid red",
          }}
        >
          <SearchInput></SearchInput>
          <ListFeaturedNews></ListFeaturedNews>
        </Box>
        <Box
          className="focus-content full-width flex-row"
          sx={{
            borderBottom: "2px solid red",
            padding: '50px',
          }}
        >
          <Box
          className="left-focus-content full-height flex-col"
          sx={{
            width: "70%",
            borderBottom: "2px solid #8F0101",
          }}
          >
            <TitleContent titleContent={"Các bài viết mới nhất"}></TitleContent>
            <Box
            className="table-newest-posts full-width flex-row"
            sx={{
              height: '700px',
              marginTop: '20px',
            }}
            >
              <Box
              className="biggest-table-newest-posts full-height flex-col"
              sx={{
                width: "70%",
                border: "2px solid #8F0101",
                borderRight: "none",
              }}
              >
                <Box
                className="image-biggest-table-newest-posts full-width flex-col"
                sx={{
                  height: "70%",
                }}
                >
                  <Image sx={{
                    objectFit: 'fill'
                  }} src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"></Image>
                </Box>
              </Box>
              <Box
                className="small-table-newest-posts full-height flex-col"
                sx={{
                  width: "30%",
                  border: '2px solid #8F0101' 
                }}
              >
                <Box
                className="image-small-table-newest-posts"
                sx={{
                  width: "100%",
                  height: "33.33%",
                }}
                >
                  <Image sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: "fill"
                  }} src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"></Image>
                </Box>
                <Box
                className="image-small-table-newest-posts"
                sx={{
                  width: "100%",
                  height: "33.33%",
                }}
                >
                  <Image sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: "fill"
                  }} src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"></Image>
                </Box>
                <Box
                className="image-small-table-newest-posts"
                sx={{
                  width: "100%",
                  height: "33.33%",
                  backgroundColor: 'red',
                }}
                >
                  <Image sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: "fill"
                  }} src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"></Image>
                </Box>
              </Box>
            </Box>
            <ListPaginatorPosts></ListPaginatorPosts>
          </Box>
          <Box
          className="right-focus-content"
          sx={{
            width: "30%",
            height: "900px",
            display: "flex",
            flexDirection: "column",
            border: '2px solid #8F0101', 
            marginLeft: '50px',
          }}
          >
          </Box>
          
        </Box>
      </Box>
    </Page>
  );
}