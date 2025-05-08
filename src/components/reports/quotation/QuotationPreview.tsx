import React from 'react'
import './quotation.css'
import QuotationEntries from './QuotationEntires'
import Address from './Address'
import QuotationMeta from './QuotationMeta'

export default function QuotationPreview (props: any) {

    const { customer, details, transactionDate, transactionNumber } = props

    const provider = {
        name: 'Apparel Kingdom',
        companyName: 'Apparel Kingdom',
        gstNo: '33AAKCA5358E2ZR', 
        shippingAddress: `Chettichavadi Road<br/>
        Kombaipatii<br/>
        Gorimedu<br/>
        Salem<br/>
        Tamil Nadu - 636008<br/>
        India`,
        contactEmail:'diwakar.ravi@apparelkingdom.org'        
    }

    const meta = {
        transactionDate: transactionDate,
        transactionNumber: transactionNumber
    }
    
      return (
        <div className="Invoice">
          <header className="Invoice-header">
            <h1 className="Logo">
              <span className="Logo-part-1"><img src="/image.png" alt="Apparel Kingdom" className="w-16 h-12" /></span>             
            </h1>
            <div className="Header-meta">
              {<span className="Logo-part-2">{"Apparel Kingdom"}</span>}
              {<br/>}
              {<span>{'Gst No : '} <strong>{'33AAKCA5358E2ZR'}</strong></span>}
              {<br/>}              
            </div>
            <hr/>
          </header>
          <div className="Invoice-body">
            <div className="Invoice-subjects">
              <Address data={provider} type={'Provider'} />
              <Address data={customer} type={'Customer'} />
            </div>
            <div className="Invoice-the-invoice">
              <h2>{'Quotation'}</h2>
              <QuotationMeta meta={meta} />
              <p>&nbsp;</p>
            </div>
            <div className="Invoice-details">
              <h3>{'Ordered Items'}</h3>
              <QuotationEntries entries={details} />
              <p>&nbsp;</p>
            </div>
          </div>
          <footer className="Invoice-footer">
            <hr/>
            <small>
              <>{provider.companyName},
              &nbsp;{'Gst No : '}&nbsp;{provider.gstNo},
              &nbsp;{ provider.shippingAddress.replace(/<br\s*\/?>/gi, ', ')},            
              </></small>
          </footer>
        </div>
      )
    }
  