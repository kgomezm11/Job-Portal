import { data } from 'autoprefixer';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';

export default function AppliedJobDataTable() {
    const router = useRouter();
    const appliedJobData = useSelector(state => state.AppliedJob.appliedJob)

    const [Data, setData] = useState([]);


    useEffect(() => {
        setData(appliedJobData)
    }, [])

    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(Data);
    }, [Data])

    


    const columns = [
        {
            name: 'Fecha envío',
            selector: row => new Date(`${row?.job?.createdAt}`).toLocaleDateString('en-GB'),
        },
        {
            name: 'Empresa',
            selector: row => row?.job?.company,
        },
        {
            name: 'Título',
            selector: row => row?.job?.title,
        },
        {
            name: 'Salario ',
            selector: row => 'GTQ.' + row?.job?.salary,
        },
        {
            name: 'Estado',
            selector: row => <p className={`uppercase font-semibold ${row?.status === "approved" ? "text-green-500" : ""}  ${row?.status === "rejected" ? "text-red-600" : ""}`}>{row?.status}</p> ,
        },
        {
            name: 'Acción',
            cell: row => <button onClick={() => router.push(`/frontend/jobDetails2/${row?.job?._id}`)} className='md:px-2 md:py-2 px-1 py-1 text-xs text-indigo-600 hover:text-white my-2 hover:bg-indigo-600 border border-indigo-600   rounded transition-all duration-700  '>Ver detalle</button>
        },
    ];




    useEffect(() => {
        if (search === '') {
            setFilteredData(Data);
        } else {
            setFilteredData(Data?.filter((item) => {
                const itemData = item?.job?.company.toUpperCase();
                const textData = search.toUpperCase();
                return itemData.indexOf(textData) > -1;
            }))
        }


    }, [search, Data])


    return (
        <>
            
                        <DataTable
                            subHeaderAlign={"right"}
                            columns={columns}
                            data={filteredData}
                            keyField="id"
                            pagination
                            title={`Solicitudes totales: ${Data?.length}`}
                            fixedHeader
                            fixedHeaderScrollHeight='79%'
                            selectableRows
                            selectableRowsHighlight
                            subHeader
                            persistTableHead
                            subHeaderComponent={
                                <input className='w-60  py-2 px-2  outline-none  border-b-2 border-indigo-600' type={"search"}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={"Buscar por nombre de empresa..."} />
                            }
                            className="h-screen bg-white"
                        />
                   

        </>
    )
}
