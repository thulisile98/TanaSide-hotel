import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../utils/ApiFunctions'
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'
import { Col, Row } from "react-bootstrap"


const ExistingRooms = () => {

    const[rooms, setRooms]= useState([])
    const[currentPage, setCurrentPage] = useState(1)
    const[roomsPerPage]=useState(8)
    const[isLoading, setIsLoading] = useState(false)
    const [filteredRooms, setFilteredRooms] = useState([])
    const[selectedRoomType, setselectedRoomType]= useState("")
    const[successMessage,setSuccessMessage]=useState("")
    const[ErrorMessagge, setErrorMessagge]=useState("")

    useEffect(()=>{
        fetchRooms()
    },[])

    const fetchRooms =async()=>{
        setIsLoading(true)
        try {
            const result = await getAllRooms()
            setRooms(result)
            setIsLoading(false)
            
        } catch (error) {
            setErrorMessagge(error.message)
            setIsLoading(false)
            
        }
    }


    useEffect(()=>{

        if(selectedRoomType === ""){
            setFilteredRooms(rooms)
        }else
        {
            const filteredRooms = rooms.filter((room)=> room.roomType === selectedRoomType)
            setFilteredRooms(filteredRooms)
        }
        setCurrentPage(1)

    },[rooms, selectedRoomType])

    const handlePaginationClick = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms)=>{
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms / roomsPerPage)
    }



    const indexOfLastRoom = currentPage* roomsPerPage
    const indexOfFirstRoom= indexOfLastRoom - roomsPerPage
    const currentRooms= filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)


  return (
    <>
     {isLoading ? (
        <p className="">
          Loading existing rooms 
        </p>
     ):(
        <>
        <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between mb-3 mt-5">
                <h2>Existing rooms</h2>
            </div>
        <Row>
           <Col md={6}  className="mb-2 mb-md-0">
            <RoomFilter  data={rooms} setFilteredData={setFilteredRooms} />
           </Col>
        </Row>
        <table className="table table-bordered table-hover">
             <thead>
                <tr className="text-center">
                 <th>ID </th>
                 <th>Room Type </th>
                 <th>Room  Price </th>
                 <th>Actions </th>
               </tr>
          </thead>
<tbody>
    {currentRooms.map((room)=>(

     <tr key={room.id} className="text-center">
        <td>{room.id}</td>
        <td>{room.roomType}</td>
        <td>{room.roomPrice}</td>
        <td>
            <button>View / Edit</button>
            <button>Delete</button>
          
        </td>
     </tr>

    ))

    }
</tbody>
        </table>

        <RoomPaginator currentPage={currentPage}
        totalPages={calculateTotalPages(filteredRooms,roomsPerPage, rooms)}
        onPageChange={handlePaginationClick}
        
        />

        </section>
        </>
     )}   
        
        
    </>
  )
}

export default ExistingRooms