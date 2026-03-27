import Th from "../../Components/branches/Th";

const TableHead = () => {
  return (
    <thead>
      {/* 'table-light' gives a subtle grey background. 
        'border-bottom' adds the line between header and body.
      */}
      <tr className="table-light border-bottom">
        <Th>Sr. No.</Th>
        <Th>Branch Name</Th>
        <Th>Branch Location</Th>
        <Th>Bank IFSC</Th>
        <Th>Phone No.</Th>
        <Th>Locker</Th>
        <Th align="right">Actions</Th>
      </tr>
    </thead>
  );
};

export default TableHead;
