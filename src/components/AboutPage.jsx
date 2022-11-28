import React from 'react'
import { Image, Flex } from '@mantine/core';
import sara from '../assets/sara.jpg';
import shirin from '../assets/shirin.jpg';
import stephanie from '../assets/stephanie.jpg';

function AboutPage() {
    return (
        <div
            style={{
                padding:"10px",
                width: 900,
                backgroundColor: "rgba(0, 0, 0, .3)",
                borderRadius:"30px",
                marginLeft: 'auto', 
                marginRight: 'auto',
                marginTop:"20px",
            }}>
            <h1 style={{color:"#C0EB75"}}>"Meet the UpManagers"</h1>
            <div
                style={{
                    display: 'flex',
                    gap: "55px",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    wrap: "wrap",
                    width: "300",
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingTop: '20px'
                }}
            >
                <div>
                    <img
                        style={{
                            width: "200px",
                            borderRadius: "20px"
                        }}
                        src={sara}
                        alt="sara"
                    />
                    <h2 style={{color:"#C0EB75"}}>Sara Silva</h2>
                    <p>Problem solver and the smart one</p>
                </div>
                <div>
                    <img
                        style={{
                            width: "200px",
                            borderRadius: "20px"
                        }}
                        src={stephanie}
                        alt="stephanie"
                    />
                    <h2 style={{color:"#C0EB75"}}>Stephanie Ahoosi</h2>
                    <p>Hard-working mastermind of the project</p>
                </div>
                <div>
                    <img
                        style={{
                            width: "200px",
                            borderRadius: "20px"
                        }}
                        src={shirin}
                        alt="shirin"
                    />
                    <h2 style={{color:"#C0EB75"}}>Shirin Atarod</h2>
                    <p>Nagger but can do the fun parts</p>
                </div>
            </div>
        </div>
    );
}

export default AboutPage