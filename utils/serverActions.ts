"use server";
import "server-only";
import axios from "axios";
import {PromptSchema} from "@/types";
import {endpoints} from "@/constants";


export const getPrompts = async () => {
    const {data, status} = await axios.get<PromptSchema[]>(endpoints.getAllPrompts);
    if (status !== 200) throw new Error("Error fetching prompts");
    return data;
};