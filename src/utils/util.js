export const convertToVietnamese = (data) => {
    let newData = '';
    if(data==='Clothes') {
        newData = 'Quần áo';
    } else if(data==='Shoes') {
        newData = 'Giày';
    } else if(data==='Electronics') {
        newData = 'Đồng hồ';
    }
    return newData;
}