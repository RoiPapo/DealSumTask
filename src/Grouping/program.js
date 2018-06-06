const stringsArr = [
    ["BRAZEMAX ESTATYS, LTD", ""],
    ["Gramkai Books", ""],
    ["Bras5emax Estates, L.T.D.", ""],
    ["BOZEMAN Enterprises", ""],
    ["BOZERMAN ENTERPRISES", ""],
    ["Nadelman, Jr", ""],
    ["John Smith", ""],
    ["PC Adelman", ""],
    ["Gramkai, Inc.", ""],
    ["Bozeman Enterprises", ""],
    ["Michele LTD", ""],
    ["Gramkat, Inc.", ""],
    ["BBAZEMAX ESTATES, LTD", ""],
    ["BOZEMAN Ent.", ""],
    ["Gramkat Estates, Inc.", ""]
];
var parsedArr = stringsArr.map(arr => arr.slice()); /* creates deep copy to keep the strings 
before parsing (creates actual arr and not just a pointer)*/
var algorithmResults = grouping(parsedArr, 3);// pick the string and the number of groups

function grouping(arr, numberOfGroups) {

    var indexOfCloser = 0;
    var parsedArr = arr.slice();
    parsedArr = parsingList(parsedArr);
    var distanceChart = calculations(parsedArr);
    var groupNumber = 1;

    for (var i = 0; i < arr.length; i++) {

        for (var j = 0; j < arr.length; j++) {

            if (distanceChart[i][j] < distanceChart[i][indexOfCloser] && distanceChart[i][j] !== 0) {
                indexOfCloser = j;
            }
        }
        if (parsedArr[indexOfCloser][1] !== "") {
            parsedArr[i][1] = parsedArr[indexOfCloser][1];

        }
        else if (parsedArr[i][1] === "") {
            parsedArr[i][1] = groupNumber;
            parsedArr[indexOfCloser][1] = groupNumber;
            groupNumber++;
        }
        indexOfCloser = 0;
    }
    return groupSizeSorting(parsedArr, numberOfGroups, distanceChart);

};
function calculations(arr) {
    var distanceChart = [];
    for (var i = 0; i < arr.length; i++) {

        distanceChart[i] = [];
        for (var j = 0; j < arr.length; j++) {
            distanceChart[i][j] = levenshteinDistance(arr[i][0], arr[j][0])
        }
    }
    return distanceChart;
}
function levenshteinDistance(a, b) {
    if (!a.length) return b.length;
    if (!b.length) return a.length;

    var matrix = [];
    // increment along the first column of each row

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    // increment each column in the first row

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    // Fill in the rest of the matrix
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1)); // deletion
            }
        }
    }
    return matrix[b.length][a.length];
};

function parsingList(arr) {// changes upper to lowercase
    for (let i = 0; i < arr.length; i++) {
        arr[i][0] = arr[i][0].toLowerCase();
    }
    return arr;
}

function groupSizeSorting(arr, numberOfGroups, distanceChart) {//sorts the groups from the major to the minor
    var groupSizes = [];
    var counter = 0;

    for (let i = 0; i < numberOfGroups; i++) {
        groupSizes[i] = [];
        groupSizes[i][1] = 0
        for (let j = 0; j < arr.length; j++) {
            if (arr[j][1] === i + 1) {
                counter++;
            }
        }
        groupSizes[i][0] = i + 1;
        groupSizes[i][1] = counter;
        counter = 0;
    }
    groupSizes.sort(sortFunction);
    function sortFunction(a, b) {
        if (a[1] === b[1]) {
            return 0;
        }
        else {
            return (a[1] > b[1]) ? -1 : 1;
        }
    }
    return findCentroid(distanceChart, arr, numberOfGroups, groupSizes);

}

function findCentroid(distanceChart, arr, numberOfGroups, groupSizes) {//creates cumulative distance table for later sorting in increasing order
    var tempDistance = 0;
    var cumulativeDistanceArray = [];

    for (let i = 0; i < distanceChart.length; i++) {
        for (let j = 0; j < distanceChart.length; j++) {
            if (arr[i][1] === arr[j][1]) {
                tempDistance += distanceChart[i][j];
            }
        }
        cumulativeDistanceArray[i] = tempDistance;
        tempDistance = 0;
    }
    return arrangeGroups(arr, numberOfGroups, groupSizes, cumulativeDistanceArray)
};

function arrangeGroups(arr, numberOfGroups, groupSizes, cumulativeDistanceArray) {
    var groups = [];
    for (let i = 0; i < numberOfGroups; i++) {
        groups[i] = [];
    }
    for (let i = 0; i < numberOfGroups; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j][1] === groupSizes[i][0])
                groups[i].push({
                    memberName: stringsArr[j][0],
                    memberDistance: cumulativeDistanceArray[j]
                });
        }
    }
    var data = [];
    for (let i = 0; i < numberOfGroups; i++) {// preapering the data which goes to the react
        data.push(
            groups[i]
        )
        data[i].sort((a, b) => parseFloat(a.memberDistance) - parseFloat(b.memberDistance)); //sorting the data by increasing order 
    }
    return data;
}

export default algorithmResults;