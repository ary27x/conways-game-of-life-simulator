import React , {useState , useEffect} from "react"
import "../styles/Board.css"
export default function Board(props)
{
    const [board , setBoard] = useState([])
    const [changeByUser , setChangeByUser] = useState(false)
    const [quickFill , setQuickFill] = useState(false)
    const [createNewTimer, setCreateNewTimer] = useState(true)
    useEffect(() => {
        if(changeByUser)
        {
            setChangeByUser(false)
            return 
        }
        if (props.running && createNewTimer)
        {
            setCreateNewTimer(false)
            setTimeout(() => 
            {
                console.log("stepping")
                step()
                setCreateNewTimer(true)

            } , 50)
        }
    } , [board , props.running])
    
    function handleKeydown(event)
    {
        if (event.code == 'KeyQ')
            setQuickFill(previousQuickFill => !previousQuickFill)
    }
   
    
    useEffect(() => {
        document.addEventListener("keydown" , handleKeydown)
        readyBoard()
    } , [])
   
    const rows = 80
    const columns = 35   
    const speed = 100
    // define the rules
    // based on odd and even numbers....
    
    function handleMouseOver(event)
    {
        if (!quickFill)
            return 
        fill(event)
    } 
   
    function fill(event)
    {
        setChangeByUser(true)
        const i = event.target.parentElement.id
        const j = event.target.id
        const newBoard = [...board]
        newBoard[i][j] = !newBoard[i][j]
        setBoard(newBoard)
    }

    function getNeighbourCount(x , y , referenceBoard)
    {
        var count = 0
        for (let i = -1 ; i <= 1 ; i++)
        {
            for (let j = -1 ; j <= 1 ; j++)
            {
                if (i == 0 && j == 0)
                    continue
                if (isValid(x + i , y + j) && referenceBoard[x+i][y+j] == true)
                    count++;
            }
        }
        return count
    }

    function isValid(a , b)
    {
        if (a >= 0 && a < columns && b >= 0 && b < rows)
            return true
        else
            return false
    }

    function step()
    {
        const bufferBoard = []
        for (let i = 0 ; i < columns ; i++)
            bufferBoard[i] = board[i].slice()
        const referenceBoard = []
        for (let i = 0 ; i < columns ; i++)
            referenceBoard[i] = bufferBoard[i].slice()

            for (let i = 0 ; i < columns; i++)
        {
            for (let j = 0; j < rows; j++)
            {
                const neighbours = getNeighbourCount(i , j , referenceBoard)
                if (neighbours == 3 && referenceBoard[i][j] == false)
                    bufferBoard[i][j] = true
                if (referenceBoard[i][j] == true)
                {
                    if (!(neighbours == 2 || neighbours == 3))
                    {
                        bufferBoard[i][j] = false
                    }
                }
            }
        }
        setBoard(bufferBoard)
    }
    
    function readyBoard()
    {
        const newBoard = []
        for(let i = 0 ; i < columns ; i++)
        {
            const newRow = []
            for (let j = 0 ; j < rows ; j++)
            {
                newRow.push(false)
            }
            newBoard.push(newRow)
        }
        setBoard(newBoard)
    }
  

    return (
        <React.Fragment>
            <div id = "board-wrapper" >
                {board.map((item , parentIndex) =>
                {
                    return <div id = {parentIndex} key = {parentIndex} className="board-row">
                            {
                                item.map ((value , childIndex) =>{
                                    return value ? 
                                    <div className="board-visible" id = {childIndex} key = {childIndex} onClick={fill} onMouseOver={handleMouseOver}></div>
                                    :
                                    <div className="board-hidden" id = {childIndex} key = {childIndex} onClick={fill} onMouseOver={handleMouseOver}></div>

                                })
                            }
                         </div>
                })}
            </div>
        </React.Fragment>
    )
}