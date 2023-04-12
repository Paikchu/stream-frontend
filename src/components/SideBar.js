import React, { createElement,useState,useEffect,useMemo } from 'react';
import { Button,} from 'antd';
import ReactPaginate from 'react-paginate';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import the styles
const ITEMS_PER_PAGE = 5;
const SideBar = () => {
    const [gameIds, setGameIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentGameId, setGameId] = useState(1);
    useEffect(() => {
        fetch('/getGameByUser/2')
            .then(response => response.json())
            .then(data => setGameIds(data))
    }, []);
    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const displayedIds = gameIds.slice(startIndex, endIndex);
    const handleJump = game_id => {
        const gid = game_id;
        setGameId(gid);
        fetch('/game_show/' + gid.toString())
            .then((response) => response.json())
            .then(data => setgamelist(data))
            .catch((error) => console.log("error"));
        fetch('/comm_show/'+currentGameId.toString())
            .then((response) => response.json())
            .then(data => setcommlist(data))
            .catch((error) => console.log("error"));
        hide_searchbox();
    };
    return (
        <div className="container">
            <div className="sidebar">
                {displayedIds.map(id => (
                    <table key={id.g_id}>
                        <Button type="link" style = {{textDecoration: "underline"}} onClick={() => handleJump(id.g_id)} className="link-button">
                            {id.g_name}{id._gid}
                        </Button>
                    </table>
                ))}
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    pageCount={Math.ceil(gameIds.length / ITEMS_PER_PAGE)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
            <div className="header" style={{position: "relative", marginLeft: "500px"}}>
                <div>
                    <div className="sidebar_2"></div>
                </div>
            </div>
        </div>

    );
}
export default SideBar;
