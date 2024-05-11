"use client";

import { getCookie, getCookies } from 'cookies-next';
import DataTable, { Alignment } from "react-data-table-component";
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {updateUser} from "@/service/getdata";
 
export default function NewUserInfo({...props}) {
  
    const userinfo = getCookies();
    const username = getCookie('username');
 
    const userlist = [...Object.values(props)];

    const data = userlist;
 
    const [showactive, setActive]=useState(true)
 
    const [records, setRecords] = useState([]);

    const [selectedRows, setSelectedRows] = useState([]);

    const [selecteduser, setSelectedUser] = useState({});

    const CallUpdateUser = async ({userid, action}) => {
       const res = await updateUser({userid, action});

       console.log(res);
  }    

    useEffect(() => {      
      setSelectedUser(selectedRows);

      console.log('state', selectedRows);      
      //console.log(selecteduser[0]["_id"]);
 

    }, [selectedRows, selecteduser]);    

   

    const handleActiveClick =(e) => {
      e.preventDefault();
    
      console.log(selecteduser);

      //const rowid =selectedRows[0]["_id"];
        
      //alert('Active clicked :' + rowid);
    }

    const handleDeleteClick = (e) => {
      e.preventDefault();
      
  
      //console.log(selectedRows[0]["_id"]);
  
      console.log(selecteduser);

      // const rowid =selectedRows[0]["_id"];
      
      // alert('Delete clicked :' + rowid);

    };

    const handleChange = useCallback((state) => {
      setSelectedRows(state.selectedRows);
      
    }, [selectedRows]);
 
    const customStyles = {
      headRow: {
        style: {
          backgroundColor: 'gray',
          color: "white"
        },
      },
      headCells: {
        style: {
          fontSize: '16px',
          fontweight: '600',
          textTransform: 'uppercase',
        },
      },
      cells: {
        style: {
          fontSize: '15px',
        },
      },
    }

    const columns = useMemo(
      () => [
        {				
          name: "Action",
          cell: () => <button onClick={handleDeleteClick}>Delete</button>,
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
        },
        {				
          cell: () => <button onClick={handleActiveClick}>Update</button>,
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
        },  
      {
         name: "Branch",
         selector: row => row.branchname,
         allowOverflow: true,
         sortable: true
      },
      {
        name: "User Name",
        selector: row => row.name,
        allowOverflow: true,
        sortable: true
      },
      {
        name: "Email",
        selector: row => row.email
      },
      {
        name: "User Role",
        selector: row => row.userrole,
        sortable: true
      },
      {
        name: "User Type",
        selector: row => row.usertype,
        sortable: true
      },
      {
        name: "Status",
        selector: row => row.isactive ? "Active" : "InActive",
        sortable: true
      },    
    ],
		[],
	);

    const conditionalRowStyles = [
      {
        when: row => row.calories < 300,
        style: {
          backgroundColor: 'rgba(63, 195, 128, 0.9)',
          color: 'white',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
      {
        when: row => row.calories >= 300 && row.calories < 400,
        style: {
          backgroundColor: 'rgba(248, 148, 6, 0.9)',
          color: 'white',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
      {
        when: row => row.calories >= 400,
        style: {
          backgroundColor: 'rgba(242, 38, 19, 0.9)',
          color: 'white',
          '&:hover': {
            cursor: 'not-allowed',
          },
        },
      },
    ];    
 
    function handleFilter(event) {
        const newData = data.filter(row => row.name.toLowerCase().includes(event.target.value.toLowerCase()))
        setActive(false)
        setRecords(newData);
        event.target.value=="" ? setActive(true) : setActive(false);
    }

    const isIndeterminate = (indeterminate) => indeterminate;
    const selectableRowsComponentProps = { indeterminate: isIndeterminate };

  return (
    
    <div className="md:container md:mx-auto">
 
      
      {/* selectableRowsComponent={Checkbox} */}

      <div className="relative overflow-x-auto mt-8">
          <div className='text-end'>
            <input type="text" placeholder="Search" onChange={handleFilter} />
          </div>
          <DataTable
              subHeaderAlign={Alignment.CENTER}
              columns={columns}
              data={showactive?data:records}
              customStyles={customStyles}
              fixedHeader
              pagination
              selectableRows
              onSelectedRowsChange={handleChange}              
              //conditionalRowStyles={conditionalRowStyles}
              //selectableRowsComponentProps={selectableRowsComponentProps}              
          >
          </DataTable>
      </div>

    </div>
  );
}

 
// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function convertArrayOfObjectsToCSV(array) {
	let result;

	const columnDelimiter = ',';
	const lineDelimiter = '\n';
	const keys = Object.keys(data[0]);

	result = '';
	result += keys.join(columnDelimiter);
	result += lineDelimiter;

	array.forEach(item => {
		let ctr = 0;
		keys.forEach(key => {
			if (ctr > 0) result += columnDelimiter;

			result += item[key];
			
			ctr++;
		});
		result += lineDelimiter;
	});

	return result;
}



// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function downloadCSV(array) {
	const link = document.createElement('a');
	let csv = convertArrayOfObjectsToCSV(array);
	if (csv == null) return;

	const filename = 'export.csv';

	if (!csv.match(/^data:text\/csv/i)) {
		csv = `data:text/csv;charset=utf-8,${csv}`;
	}

	link.setAttribute('href', encodeURI(csv));
	link.setAttribute('download', filename);
	link.click();
}
const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export</Button>;
export const ExportCSV = () => {
	const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);

	return <DataTable title="Movie List" columns={columns} data={data} actions={actionsMemo} />;
};