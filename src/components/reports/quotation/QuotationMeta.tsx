import React from 'react'

export default function QuotationMeta (props: any) {

    const { meta } = props
    return (
      <div className="Invoice-meta">
        <table className="Invoice-table">
          <thead>
          <tr>
            <th>{'Invoice Date'}</th>
            <th>{'Invoice Number'}</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{meta.transactionDate}</td>
            <td>{'QO-'}{meta.transactionNumber}</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }