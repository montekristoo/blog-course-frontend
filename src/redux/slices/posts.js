import {
    getMenuUtilityClass
} from "@mui/material";
import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import {
    startTransition
} from "react";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async() => {
    const {
        data
    } = await axios.get("/posts");

    return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async() => {
    const {
        data
    } = await axios.get("/tags");

    return data;
});

export const fetchRemovePost = createAsyncThunk(
    "posts/fetchRemovePost",
    async(id) => {
        const {
            data
        } = await axios.delete(`/posts/${id}`);

        return data;
    }
);

const initialState = {
    posts: {
        items: [],
        status: "loading",
    },
    tags: {
        items: [],
        status: "loading",
    },
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducer: {},
    extraReducers: {
        ///
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = "loading";
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = "loaded";
        },
        [fetchTags.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = "loaded";
        },

        ///
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = "loading";
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = "loaded";
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = "loaded";
        },

        ///

        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(
                (obj) => obj._id !== action.meta.arg
            );
        },
    },
});

export const postsReducer = postsSlice.reducer;