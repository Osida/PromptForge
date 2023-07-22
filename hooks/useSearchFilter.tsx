"use client";
import React, {useEffect, useState} from "react";
import {PromptSchema} from "@/types";

const useSearchFilter = (data: PromptSchema[] | undefined, searchValue: string = "") => {
    const [filteredData, setFilteredData] = useState<PromptSchema[] | undefined>(data);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    useEffect(() => {
        if (searchValue && searchValue !== "" && data) {
            setFilteredData(
                data.filter(({prompt, creator, hashtags}) =>
                    prompt.toLowerCase().includes(searchValue.toLowerCase()) ||
                    creator.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    creator.email.toLowerCase().includes(searchValue.toLowerCase()) ||
                    hashtags.toLowerCase().includes(searchValue.toLowerCase()
                    )
                ));
        } else {
            setFilteredData(data);
        }
    }, [searchValue, data]);

    return filteredData;
};

export default useSearchFilter;
