import React from 'react'

function pagination() {

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 2;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = userlist.slice(firstIndex, lastIndex);
    const npage = Math.ceil(userlist.length / recordsPerPage);
    const pnumbers = [...Array(npage + 1).keys()].slice(1);

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }
    function prevPage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function ChangeCPage(id) {
        setCurrentPage(id)
    }

    return (
        <div>

            <nav>
                <ul className='flex'>
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={prevPage}>Prev</a>
                    </li>
                    {
                        pnumbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a href="#" className="page-link" onClick={() => ChangeCPage(n)}>{n}</a>
                            </li>
                        ))
                    }
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={nextPage}>Next</a>
                    </li>

                </ul>
            </nav>


        </div>
    )
}

export default pagination