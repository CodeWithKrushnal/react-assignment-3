import './App.css'
import {useEffect, useState} from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Input} from "@/components/ui/input"
import * as React from "react";
import {User,Resp} from "./types/types.ts"

const fetchData = async (setData: React.Dispatch<React.SetStateAction<Resp>>, setDisplayData: React.Dispatch<React.SetStateAction<Resp>>) => {
    const response:Response = await fetch("https://reqres.in/api/users?per_page=12");
    const json: resp = await response.json();
    setData(json);
    setDisplayData(json);
};

function App() {

    const [data, setData] = useState({
        page: 0,
        per_page: 0,
        total: 0,
        total_pages: 0,
        data: [],
    } as Resp);

    const [displayData, setDisplayData] = useState({
        page: 0,
        per_page: 0,
        total: 0,
        total_pages: 0,
        data: [],
    } as Resp);

    useEffect(() => {
            fetchData(setData, setDisplayData);
        }, [Table]
    )

    // Custom Hook
    const useSearch  = (event:React.KeyboardEventHandler<HTMLInputElement>): void => {
        console.log(event);
        const res = data.data.filter((unit: User): boolean => unit.first_name.toLowerCase().includes(event.target.value.toLowerCase()) || unit.last_name.toLowerCase().includes(event.target.value.toLowerCase()) || unit.email.toLowerCase().includes(event.target.value.toLowerCase()) || unit.id.toString().includes(event.target.value));
        setDisplayData({
            page: data.page,
            per_page: data.per_page,
            total: data.total,
            total_pages: data.total_pages,
            data: res
        })
    }

    return (
        <center>
            < div>
                <h1 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0 p-10 items-center">React
                    Custom Hook Demo</h1>
                <div className="flex w-full max-w-sm items-center space-x-2 pb-10">
                    <Input type="text" placeholder="Search By Anything" onKeyUp={useSearch}/>
                </div>
                <Table className="w-1/2">
                    <TableCaption>A Demo For React Custom Hook</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Avatar</TableHead>
                            <TableHead>First Name</TableHead>
                            <TableHead>Last Name</TableHead>
                            <TableHead>Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {displayData.data.map((unit: User) => (
                            <TableRow key={unit.id}>
                                <TableCell>{unit.id}</TableCell>
                                <TableCell> <Avatar>
                                    <AvatarImage src={unit.avatar} alt="@shadcn"/>
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar></TableCell>
                                <TableCell>{unit.first_name}</TableCell>
                                <TableCell>{unit.last_name}</TableCell>
                                <TableCell>{unit.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5}>Total Users: {displayData.data.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </center>
    )
}

export default App