export const convertHashtags = (hashtagString: string) => {
    // Split the string into an array using ' ' (space) as the delimiter
    const hashtagsArray = hashtagString.split(" ");

    // Filter out any empty strings in case there were multiple spaces
    return hashtagsArray.filter(hashtag => hashtag !== "");
};