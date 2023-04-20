import './Pagination.css';

function Pagination({setCurrentPage,length,productPerPage,currentPage}) {
    const pages = [];
    for(let i = 1;i<=Math.ceil(length/productPerPage);i++) {
        pages.push(i);
    }

    return (
        <>
            <div className="pagination">
                {pages.map((page,index) => {
                    return <button onClick={() => setCurrentPage(page)} key={index} className={page===currentPage ? 'btn-pagina active' : 'btn-pagina'}>{page}</button>
                })}
            </div>
        </>
    )
}

export default Pagination;