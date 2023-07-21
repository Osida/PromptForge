"use client";
import React, {useEffect, useState} from "react";
import {TypePrompts} from "@/app/page";

const useSearchFilter = (data: TypePrompts | undefined, searchValue: string = "") => {
    const [filteredData, setFilteredData] = useState<TypePrompts | undefined>(data);

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
