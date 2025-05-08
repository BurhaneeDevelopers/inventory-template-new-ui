export default function Address (props: any) {
    const { data, type  } = props
    return (
        <div className={`Invoice-subject Subject-${type}`}>
            <div style={{width:"80%", backgroundColor:"#3C4F8A", padding:"5px 10px"}}><small>{type}</small></div>
            <p>
            {data.customer_Name && <strong>{data.customer_Name}</strong>}
            {data.customer_Name && <br/> }
            {data.companyName && <strong>{data.companyName}</strong>}
            {data.companyName && <br/>}
            {data.gstNo && `${'GST No : '} ${data.gstNo}`}
            {data.gstNo && <br/>}
            {data.contactPerson && `${'Contact Person : '} ${data.contactPerson}`}
            {data.contactPerson && <br/>}            
            <div dangerouslySetInnerHTML={{ __html: data.shippingAddress}} />
            {data.contactPhoneNumber}<br/>
            {data.contactEmail && <>{data.contactEmail}<br/></>}
            {data.website && <>{data.website}<br/></>}
            </p>
        </div>
  )
}