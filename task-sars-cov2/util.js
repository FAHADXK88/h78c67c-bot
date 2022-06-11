const enMonthsToHani = (i) => {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].indexOf(i) + 1 + '';
};

const matchWorldwide = [
    /confirmed\s*=\s*(\d+)\n/,
    /deaths\s*=\s*(\d+)\n/,
    /time\s*=\s*(\d{2}:\d{2}) UTC\n/,
    /date\s*=\s*(\d{1,2}) \w{3,9} \d{4}\n/,
    /date\s*=\s*\d{1,2} (\w+) \d{4}\n/,
    /date\s*=\s*\d{1,2} \w{3,9} (\d{4})\n/
];

export { enMonthsToHani, matchWorldwide };