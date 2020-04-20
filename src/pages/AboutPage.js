import React from 'react';
import CarImg from "../assets/b.jpg";

export default function ElectricalPage(){
    return  (<div class="ui segment">
                <div class="ui huge header centered">About the Team</div>
                <img class="ui centered big image" src={CarImg}/>
                <div class="ui centered">We are the Formula SAE team located at South Dakota State University known as Wild Hare Racing. 
            We are a team of students that creates a quarter-scale Formula 1 style car to compete in the international competition known as Formula SAE.
            The team is divided into six subteams:</div>
            <div class="ui segment">
            <div class="ui bulleted list">
                <div class="item">
                    <div class="content">
                    Aerodynamics
                    </div>
                    <div class="ui bulleted list">
                        <div class="item">
                            <div class="content">
                            Force air up, car stays down.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                    Electrical
                    </div>
                    <div class="ui bulleted list">
                        <div class="item">
                            <div class="content">
                            The best electrical system, is one that you don't even realize is working.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                    Engine
                    </div>
                    <div class="ui bulleted list">
                        <div class="item">
                            <div class="content">
                            Nothing moves without our say. And generally we don't have a say in it.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                    Frame
                    </div>
                    <div class="ui bulleted list">
                        <div class="item">
                            <div class="content">
                            Stiffness is key, it is the fifth spring after all.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                    Suspension
                    </div>
                    <div class="ui bulleted list">
                        <div class="item">
                            <div class="content">
                            Keeping the tires to the road... mostly.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                    Controls
                    </div>
                    <div class="ui bulleted list">
                        <div class="item">
                            <div class="content">
                            What good is a fast car if you can't control it?
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
                <div class="ui centered">Each subteam is dedicated to achieving the maximum performance from their system. The team is lead by two individuals, the Team Principal and the Design Lead. </div>
              </div>
            );
} 