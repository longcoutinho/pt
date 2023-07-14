import {Backend, PAGE_TITLE} from "@/constants";
import Page from "@/layouts";
import { Box, Button, Input, Paper } from "@mui/material";
import PaginationMui from '@mui/material/Pagination';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
<link rel="preconnect" href="https://fonts.gstatic.com"></link>;
import {Post, TypePost} from "../../interfaces/response"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y, Pagination, Autoplay } from "swiper";
import {router} from "next/client";
import Link from "next/link";

export default function SearchComponent() {
    const [listPosts, setListPost] = useState<Post[]>([]);
    const [listFeaturedPosts, setListFeaturedPosts] = useState<Post[]>([]);
    const [pageDefault, setPageDefault] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [title, setTitle] = useState("");
    const [postsType, setPostsType] = useState<string>("");
    const [listTypePost, setListTypePost] = useState<TypePost[]>([]);
    const {push, query} = useRouter();
    const textInput = useRef<any>();

    useEffect(() => {
        console.log(query.type);
        // @ts-ignore
        setPostsType(query.type);
        axios({
            method: "get",
            url: Backend.URL + "/type/0",
        }).then(
            (res) => {
                console.log(res.data);
                setListTypePost(res.data);
            },
            (err) => {
                console.log(err);
            }
        );
            if (query.title != undefined && query.page != undefined && query.pageSize != undefined) {
                axios({
                    method: "get",
                    url: Backend.URL + "/posts",
                    params: {
                        page: query.page,
                        pageSize: query.pageSize,
                        title: query.title,
                    },
                }).then(
                    (res) => {
                        setListPost(res.data.content);
                        setPageDefault(res.data.pageable.pageNumber + 1);
                        setPageCount(res.data.totalPages);
                    },
                    (err) => {
                        console.log(err);
                    }
                );
            }
    }, [query]);

    //datas

    const redirectPagination = (page: string, pageSize: any) => {
        var pageNumber = parseInt(page);
        pageNumber--;
        push({
            pathname: "/posts",
            search: "?" + new URLSearchParams({
                page: pageNumber.toString(),
                pageSize: pageSize,
                type: title,
            }),
        });
    };

    const redirectSearchInput = (page: string, pageSize: any, title: any) => {
        var pageNumber = parseInt(page);
        pageNumber--;
        push({
            pathname: "/posts",
            search: "?" + new URLSearchParams({
                page: pageNumber.toString(),
                pageSize: pageSize,
                type: title,
            }),
        });
    }

    const paginationChange = (e: any) => {
        redirectPagination(e, 9);
    }

    const searchPosts = (event: any) => {
        if (event.key == 'Enter') {
            setTitle(event.target.value);
            redirectSearchInput("1", 9, event.target.value)
        }
    }

    const handleChangeInput = (e: any) => {
        setTitle(e.target.value);
    }

    const SearchInput = () => {
        return (
            <Box
                className="search-input full-width center flex-row"
            >
                <input autoFocus value={title} onChange={handleChangeInput} className="list-posts-input-content" onKeyDown={searchPosts} placeholder="Nội dung tìm kiếm" ref={textInput}/>
            </Box>
        );
    };

    const ListFeaturedPosts = () => {
        const options = {
            slidesPerView: 1,
            spaceBetween: 50,
            breakpoints: {
                300: {
                    slidesPerView: 1,
                },
                690: {
                    slidesPerView: 1,
                },
                1100: {
                    slidesPerView: 1,
                },
                1300: {
                    slidesPerView: 1,
                },
                1600: {
                    slidesPerView: 1,
                },
                1900: {
                    slidesPerView: 1,
                },
            },
        };

        const ListFeaturedPostsComponent = listFeaturedPosts.slice(0,4).map((featuredPost, index) => (
            <Box key={index}>
                <SwiperSlide onClick={() => redirect(featuredPost.id)} key={index} className="swiper-slide-featured-posts">
                    <div className="slide-post">
                        <div className="posts-image" style={{cursor:'pointer'}}>
                            <img
                                src={featuredPost.titleImageUrlStream}
                                className="swiper-slide-featured-posts-image"
                                alt=""

                            /></div>
                        <div className="swiper-slide-featured-posts-content">
                            <p className="post-page-para-tilte">{featuredPost?.title}</p>
                            <p className="post-page-para-intro">{featuredPost?.introduction}</p>
                            <p className="post-page-create-at">{featuredPost?.createAt}</p>
                        </div></div>
                </SwiperSlide>
            </Box>
        ));

        const ListReadMost = listFeaturedPosts.slice(0, 4).map((post, index) => (
            <Box key={index} className="list-read-most-content">
                <Box className="rounded-index">
                    <p>{index + 1}</p>
                </Box>
                <p onClick={() => redirect(post.id)} className="list-read-most-title" style={{marginLeft: "10px"}}>{post.title}</p>
            </Box>
        ));

        return (
            <Box className="list-posts-page-featured-container">
                <Box className="list-posts-page-featured-wrapper">
                    <Swiper
                        className="list-posts-featured-swiper"
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        {...options}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        {ListFeaturedPostsComponent}
                        ...
                    </Swiper>
                </Box>
            </Box>
        )
    }

    const redirect = (id: any) => {
        push({
            pathname: "/posts/detail",
            search: "?" + new URLSearchParams({ id: id }),
        });
    };


    const ListPosts = () => {
        const ListPostComponents = (props: any) => {
            return (
                <Box
                    className="list-posts-container"
                >
                    {listPosts.map((post, index) => {
                        return (
                            <Box
                                onClick={() => redirect(post.id)}
                                key={index}
                                className="list-posts-search-element"
                            >
                                <Box className="image-and-content-element">
                                    <Box className="list-posts-image">
                                        <img
                                            alt=""
                                            id="image-post_tintuc"
                                            src={post.titleImageUrlStream}
                                        />
                                    </Box>
                                    <Box
                                        className="list-posts-search-content"
                                    >
                                        <h1 style={{ fontSize: "18px", fontWeight: "800", color: "rgb(0,32,96)", textTransform: "uppercase"}} className="title-list-posts-element">
                                            {post.title}
                                        </h1>
                                        <p
                                            className="introduction-list-posts-element"
                                            style={{ fontSize: "10px", color: "rgb(0,32,96)", marginTop: "5px"}}
                                        >
                                            {post.introduction}
                                        </p>
                                        <p style={{marginTop: "5px"}}>{post.createAt}</p>
                                    </Box>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            );
        };

        return (
            <Box
                className="list-posts-wrapper"
                sx={{
                    padding: "0",
                    flexGrow: 1,
                }}
            >
                <ListPostComponents />
                {<PaginationMui count={pageCount} defaultPage={pageDefault} variant="outlined" onChange={(e: any, value) => paginationChange(value)} sx={{color:'white'}}/>}
            </Box>
        );
    };

    const listType = [
        "Tin phong thủy",
        "Vật phẩm phong thủy",
        "Sự kiện",
        "Ứng dụng vạn sự kỳ thư",
        "Tin trà",
    ];

    const Title = () => {
        return (
            <Box className="post-page-title-wrapper">
                <p>{postsType}</p>
            </Box>
        )
    }

    const Directory = () => {
        const PostTypeDirectory = () => {
            if (query.title === undefined) {
                return (<Box></Box>)
            }
            else {
                return (
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <p className="directiory-icon"> {' >> '} </p>
                        <a href="#">Tìm kiếm với từ khóa `&apos;`{query.title}`&apos;`</a>
                    </Box>
                )
            }
        }
        return (<Box className="directory-wrapper">
            <a href="./">Trang chủ</a>
            <p className="directiory-icon"> {'>>'} </p>
            <Link href="/posts?page=0&pageSize=9">TÌm kiếm</Link>
            <PostTypeDirectory></PostTypeDirectory>
        </Box>)
    }

    const Post = () => {
        return (
            <Box className="post-page-content-container">
                <Box className="search-page-content-wrapper">
                    <Directory></Directory>
                    <ListPosts></ListPosts>
                </Box>
            </Box>
        );
    }

    return (
        <Page title={PAGE_TITLE.HOME} menuIndex={0}>
            <Box className="post_content">
                <Post></Post>
            </Box>
        </Page>
    );
}
