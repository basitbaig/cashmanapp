import React, { Component } from "react";
import { TelerikReportViewer } from '@progress/telerik-react-report-viewer'

export default function ReportViewer({viewer}) {

    const reportdata = JSON.stringify(this.props.data.data);
    
    const rs = {
            report: 'Speakers Report.trdp',
            parameters: { DataParameter: reportdata }
        };
        viewer.setReportSource(rs);

    const speakerObjects = JSON.stringify(this.props.data.data);


  return (
    <TelerikReportViewer
    ref={el => this.viewer = el}
    serviceUrl="/reports/"
    reportSource={{
        report: 'cashledger.trdx',
        parameters: {
            'DataParameter': speakerObjects
        }
    }}
    viewerContainerStyle={{
        position: 'absolute',
        height: '90%',
        width: '55%',
        top: '6%',
        overflow: 'hidden',
        clear: 'both',
        fontFamily: 'ms sans serif'
    }}
    scaleMode="SPECIFIC"
    scale={1.2}
    enableAccessibility={false} />
  )
}

 //https://docs.telerik.com/reporting/knowledge-base/window-is-not-defined-nextjs