

import React, { useState, useEffect } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import Papa from 'papaparse';

import Image from 'next/image'
import { Inter } from 'next/font/google'

import { readString } from 'react-papaparse'; // To parse the CSV data

import negative_tweets from "../images/Negative_Tweets.png";
import positive_tweets from "../images/Positive_Tweets.png";
import neutral_tweets from "../images/Neutral_Tweets.png";
import bar_plot from "../images/Bar_Plot.png";
import bar_plot_ml from "../images/Bar_Plot_MLs.png";
import bg_image from "../images/jeep-hd-bg.png"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [data, setData] = useState([]);
  const [columnArray, setColumn] = useState([]);
  const [values, setValues] = useState([]);
  const [clicked, setClicked] = useState(false);

const handleLoadCSV = () => {

    setClicked(true);

    Papa.parse("https://raw.githubusercontent.com/Zeraphim/jeepney-phaseout-dataset/main/jeepney_phaseout_tweets.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(result) {
        const columnArray = [];
        const valuesArray = [];

        result.data.map((d) => {
          columnArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setData(result.data);
        setColumn(columnArray[0]);
        setValues(valuesArray);
      }
    })
  }
  const handleFile = (event) => {
    Papa.parse("https://raw.githubusercontent.com/Zeraphim/jeepney-phaseout-dataset/main/jeepney_phaseout_tweets.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(result) {
        const columnArray = [];
        const valuesArray = [];

        result.data.map((d) => {
          columnArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setData(result.data);
        setColumn(columnArray[0]);
        setValues(valuesArray);
      }
    })
  }
  

  return (

    <div class="scroll">

        <div class="header-1 flex flex-col bg-gray-200">

            {/* Title */}

            <div class="flex items-center justify-center bg-gray-800 px-4 py-2">
              <p class="text-center text-white text-xl">Jeepney Phaseout Tweets Sentiment Analysis</p>
            </div>

            {/* Navbar Items */}

            <nav class="sticky w-full top-0 z-50 px-4 bg-gray-800 px-4 py-2 flex flex-col lg:flex-row lg:items-center flex-shrink-0">

              <div class="hidden lg:flex flex-grow" id="navbar-collapse">
                <ul class="flex flex-col mt-3 mb-1 lg:flex-row lg:mx-auto lg:mt-0 lg:mb-0">
                  <li>
                    <a href="#home" class="block text-gray-500 hover:text-gray-300 py-2 md:mx-2">Home</a>
                  </li>
                  <li>
                    <a href="#dataset" class="block text-gray-500 hover:text-gray-300 py-2 md:mx-2">Dataset</a>
                  </li>
                  <li>
                    <a href="#results" class="block text-gray-500 hover:text-gray-300 py-2 md:mx-2">Results</a>
                  </li>
                  <li>
                    <a href="https://colab.research.google.com/drive/1e8v1zvAJhCI6DOKkGFJyrpkb-wOhAWIh?usp=sharing" target="_blank" class="block text-gray-500 hover:text-gray-300 py-2 md:mx-2">Code</a>
                  </li>
                </ul>
                <div class="flex my-3 lg:my-0">
                </div>
              </div>
            </nav>


            {/* Hero */} 

            <div className="bg-cover" style={{ backgroundImage: `url(${bg_image.src})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>

              <div class="flex content-center p-4 lg:py-16 lg:px-8 text-center max-w-xl mx-auto my-auto h-screen w-screen" id="home">
                <div class="text-center mx-auto my-auto">
                  <span class="fas fa-bookmark w-12 h-12 lg:w-16 lg:h-16 bg-purple-700 rounded-full text-white text-lg lg:text-2xl pt-4 lg:pt-5"></span>
                  <h1 class="text-4xl lg:text-5xl my-3 lg:mt-4 text-white">Welcome!</h1>
                  <p class="text-xl text-white shadow-lg">This project conducts sentiment analysis on web-scraped tweets discussing the Jeepney Phaseout in the Philippines. The Jeepney Phaseout is a government policy aiming to modernize public transportation. By analyzing the sentiment expressed in these tweets, we aim to understand the public's overall sentiment and gain insights into key themes surrounding the policy. The results of this analysis provide valuable information for policymakers and the public, aiding in decision-making and understanding public sentiment during significant policy changes.</p>
                  <a href="https://colab.research.google.com/drive/1e8v1zvAJhCI6DOKkGFJyrpkb-wOhAWIh?usp=sharing" target="_blank" rel="noopener noreferrer">
                    <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 lg:py-3 lg:px-6 rounded mt-6 lg:mt-12">View Code</button>
                  </a>
                </div>
              </div>

            </div>
          


      {/* Dataset */}

      <div className="bg-[#5289B5]" id="dataset">

        <div className="container mx-auto p-4 my-11">
          
          <h1 className="font-bold text-5xl mb-4 text-center text-white">Dataset</h1>

          <div className="flex justify-center items-center">
            <button className="block my-10 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 lg:py-3 lg:px-1 rounded mt-6 lg:mt-12" onClick={handleLoadCSV}>
              Open Dataset
            </button>
          </div>

          <div className={`overflow-x-auto ${clicked ? 'h-screen border-4 rounded-xl'  : ''}`}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {columnArray.map((col, i) => (
                    <th className="px-2 py-3 bg-gray-50 text-left leading-4 font-medium text-gray-500 uppercase tracking-wider" key={i}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {values.map((v, i) => (
                  <tr key={i}>
                    {v.map((value, i) => (
                      <td className="px-2 py-4" key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Data Visualizations */}

      <div id="results">

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-3 md:gap-6 py-20">
            <h1 className="font-bold text-5xl break-words text-center">Results</h1>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 py-2">
            <p className="font-bold text-2xl text-center">Data Visualization</p>
          </div>

          <div className="max-w-lg grid grid-cols-1 mx-auto mb-10 py-20 text-center">
            <div className="max-w-lg">
              <Image src={positive_tweets} alt='' className="w-500 mx-auto border-4 rounded-xl" />
              <p className="pt-5 font-bold text-lg">Word Cloud</p>
              <p className="pt-5 font-md text-lg">Positive Tweets</p>
            </div>
          </div>

          <div className="max-w-lg grid grid-cols-1 mx-auto mb-10 py-20 text-center">
            <div className="max-w-lg">
              <Image src={negative_tweets} alt='' className="w-500 mx-auto border-4 rounded-xl" />
              <p className="pt-5 font-bold text-lg">Word Cloud</p>
              <p className="pt-5 font-md text-lg">Negative Tweets</p>
            </div>
          </div>


          <div className="max-w-lg grid grid-cols-1 mx-auto mb-10 py-20 text-center">
            <div className="max-w-lg">
              <Image src={neutral_tweets} alt='' className="w-500 mx-auto border-4 rounded-xl" />
              <p className="pt-5 font-bold text-lg">Word Cloud</p>
              <p className="pt-5 font-md text-lg">Neutral Tweets</p>
            </div>
          </div>


          <div className="max-w-lg grid grid-cols-1 mx-auto mb-10 py-20 text-center">
            <div className="max-w-lg">
              <Image src={bar_plot} alt='' className="w-500 mx-auto border-4 rounded-xl" />
              <p className="pt-5 font-bold text-lg">Bar Plot</p>
              <p className="pt-5 font-md text-lg">All Sentiments</p>
            </div>
          </div>


         <div className="max-w-lg grid grid-cols-1 mx-auto mb-10 py-20 text-center">
            <div className="max-w-lg">
              <Image src={bar_plot_ml} alt='' className="w-500 mx-auto border-4 rounded-xl" />
              <p className="pt-5 font-bold text-lg">Bar Plot</p>
              <p className="pt-5 font-md text-lg">ML Models Trained</p>
            </div>
          </div>
          
        </div>

      </div>


  </div>
  )
}
