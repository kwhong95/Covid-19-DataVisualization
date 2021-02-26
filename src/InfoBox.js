import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";
import './InfoBox.css';

const InfoBox = ({ title, cases, total, active, isRed, ...props }) => {
    return (
        <Card
            className={`infoBox ${active} && infoBox--selected
            ${isRed} && infoBox--red
            `}
            onClick={props.onClick}
        >
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {title}
                </Typography>
                <Typography className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
                    {cases}
                </Typography>
                <Typography className="infoBox__total" color="textSecondary">
                    {total}Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox