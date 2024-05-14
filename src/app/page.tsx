'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import { CardContent, Card } from "@/components/ui/card"
import { useEffect, useState } from "react";


export default  function Home() {

  // テストテスト

  const searchUrl = 'https://ja.wikipedia.org/w/api.php?origin=*&action=query&prop=links&format=json&list=backlinks&bllimit=50&bltitle=' 
  const [text, setText] = useState("");
  const [addText, setAddText] = useState("");
  const [flag, setFlag] = useState(false);
  const [listWiki, setListWiki] = useState("");

  useEffect(() => {
    setAddText("");
    setAddText(text);
    // console.log("テスト；"+text);
    
    async function fetchTodos() {
      var URL = searchUrl + text;
      // console.log(URL);
      var wikiPedia: any = await fetch(URL,{
        method: 'GET',
      }).then((response) => {
            return response.json();
        }).catch(() => {
          alert("wikipediaにアクセスできません");
        });
      // console.log(wikiPedia);

      if(!wikiPedia){
        alert("エラーが出ました。")
        return false;
      }
      if (!wikiPedia.query.backlinks){ return false; }
      let wikipedias: any = wikiPedia.query.backlinks;
      
      // var wikiJson = JSON.stringify(wikiPedia); 
      // let wikiString = JSON.parse(wikiJson);
      // console.log(wikiString[0])
      // console.log(wikiString.query.backlinks);

      setListWiki(wikipedias.map((wiki:any) => (
      <li key={wiki.pageid} ><button type="button" onClick={ () => {

        window.scroll({
          top: 0,
          behavior: "smooth",
        });

        async function fetchUpdate() {
          setText("");
        setText(wiki.title);
        console.log("更新された値：" + text)

        var URL = searchUrl + text;
        console.log(URL);
        var wikiPedia = await fetch(URL,{
          method: 'GET',
        }).then((response) => {
          return response.json();
        }).catch(() => {
          alert("wikipediaにアクセスで��せん");
        });
        console.log(wikiPedia);

        }
        fetchUpdate();
      }}>{wiki.title}</button></li>
    )));
    if (text == displayValue) {
      alert("おめでとうございます");
      window.location.reload();
    }
    }
    fetchTodos();
    
    

  },[flag]);
  
  const [inputValue, setInputValue] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
    console.log(displayValue);
  };

  const handleButtonClick = () => {

    if (inputValue.trim() === '') {
      alert('入力フィールドが空です。値を入力してください。');
      return;
    }

    setDisplayValue(inputValue);
    setButtonClicked(true); 
  };

  useEffect(() => {
    if (buttonClicked) {
      console.log(displayValue); 
    }
  }, [displayValue]);

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black dark:bg-gray-950">
        <div className=" container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_650px] lg:gap-12 xl:grid-cols-[1fr_750px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">

                <div>


                <form>
                  
                    {/* <Wikigolflayoout></Wikigolflayoout> */}
                  
                  <h1 className=" text-white sm:text-4xl md:text-5xl lg:text-6xl/none text-3xl"><span className=" text-gray-400">ゴール：</span>{displayValue}</h1>
    <div className="flex">
      <input className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"  type="text" value={inputValue} onChange={handleInputChange} disabled={buttonClicked}/>
      
      <Button
        className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
        variant="secondary"
        onClick={handleButtonClick}
        disabled={buttonClicked}
      >
        Learn More
      </Button>
    </div>

              </form>


                </div>

                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-green-400 dark:text-green-300">
                  <span className=" text-gray-400">単語：</span>{addText}
                </h1>
                <p className=" text-white ">
                  単語：<input id="input" className=" text-black" value={text} onChange={(event) => setText(event.target.value)} placeholder="太宰治"/>
                </p>
                
                <div className="flex gap-4">
                  <Button className="bg-green-400 hover:bg-green-500 text-black" variant="default" onClick={() => setFlag((start) => !start)}>
                    Play Now
                  </Button>
                  <Button
                    className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                    variant="secondary"
                  >
                    Learn More
                  </Button>
                  
                    

                </div>
                <ul className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                    {listWiki}
                  </ul>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black dark:bg-gray-950">
        <div className="container grid items-center justify-center gap-4 px-4 md:px-6 lg:gap-10">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-400 dark:text-green-300">
              Explore Our Enchanting Game Modes
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
              Choose from a variety of whimsical game modes to suit your mood and skill level.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-black dark:bg-gray-950 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-start gap-4">
                <img
                  alt="Enchanted Forest"
                  className="aspect-[3/2] w-full overflow-hidden rounded-lg object-cover object-center"
                  height="300"
                  src="/placeholder.svg"
                  width="450"
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-green-400 dark:text-green-300">Enchanted Forest</h3>
                  <p className="text-gray-300 dark:text-gray-300">
                    Tee off amidst the whimsical trees and vibrant flora of our enchanted forest course.
                  </p>
                  <Button className="text-green-400 hover:text-green-500" variant="link">
                    Play Now
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-black dark:bg-gray-950 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-start gap-4">
                <img
                  alt="Fairy Tale Fairways"
                  className="aspect-[3/2] w-full overflow-hidden rounded-lg object-cover object-center"
                  height="300"
                  src="/placeholder.svg"
                  width="450"
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-green-400 dark:text-green-300">Fairy Tale Fairways</h3>
                  <p className="text-gray-300 dark:text-gray-300">
                    Navigate through a whimsical course filled with enchanting obstacles and hidden surprises.
                  </p>
                  <Button className="text-green-400 hover:text-green-500" variant="link">
                    Play Now
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-black dark:bg-gray-950 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-start gap-4">
                <img
                  alt="Dreamscape Greens"
                  className="aspect-[3/2] w-full overflow-hidden rounded-lg object-cover object-center"
                  height="300"
                  src="/placeholder.svg"
                  width="450"
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-green-400 dark:text-green-300">Dreamscape Greens</h3>
                  <p className="text-gray-300 dark:text-gray-300">
                    Lose yourself in the serene beauty of our dreamlike golf course, where reality and fantasy blend.
                  </p>
                  <Button className="text-green-400 hover:text-green-500" variant="link">
                    Play Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black dark:bg-gray-950">
        <div className="container grid items-center justify-center gap-4 px-4 md:px-6 lg:gap-10">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-400 dark:text-green-300">
              Unwind and Recharge
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
              Experience the tranquility of our nature-inspired golf course and let your worries melt away.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-black dark:bg-gray-950 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-start gap-4">
                <img
                  alt="Relaxing Retreat"
                  className="aspect-[3/2] w-full overflow-hidden rounded-lg object-cover object-center"
                  height="300"
                  src="/placeholder.svg"
                  width="450"
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-green-400 dark:text-green-300">Relaxing Retreat</h3>
                  <p className="text-gray-300 dark:text-gray-300">
                    Unwind and recharge on our serene, nature-inspired courses, where the only sounds are the gentle
                    breeze and the chirping of birds.
                  </p>
                  <Button className="text-green-400 hover:text-green-500" variant="link">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-black dark:bg-gray-950 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-start gap-4">
                <img
                  alt="Mindful Moments"
                  className="aspect-[3/2] w-full overflow-hidden rounded-lg object-cover object-center"
                  height="300"
                  src="/placeholder.svg"
                  width="450"
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-green-400 dark:text-green-300">Mindful Moments</h3>
                  <p className="text-gray-300 dark:text-gray-300">
                    Embrace the present moment and find inner peace as you navigate our calming, nature-inspired
                    courses.
                  </p>
                  <Button className="text-green-400 hover:text-green-500" variant="link">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-black dark:bg-gray-950 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-start gap-4">
                <img
                  alt="Serene Sanctuary"
                  className="aspect-[3/2] w-full overflow-hidden rounded-lg object-cover object-center"
                  height="300"
                  src="/placeholder.svg"
                  width="450"
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-green-400 dark:text-green-300">Serene Sanctuary</h3>
                  <p className="text-gray-300 dark:text-gray-300">
                    Escape the stresses of everyday life and find solace in the tranquil beauty of our nature-inspired
                    golf courses.
                  </p>
                  <Button className="text-green-400 hover:text-green-500" variant="link">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <footer className="bg-black text-white p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">About</h3>
            <Link className="hover:underline" href="#">
              Our Story
            </Link>
            <Link className="hover:underline" href="#">
              Our Team
            </Link>
            <Link className="hover:underline" href="#">
              Careers
            </Link>
            <Link className="hover:underline" href="#">
              Press
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Game Modes</h3>
            <Link className="hover:underline" href="#">
              Enchanted Forest
            </Link>
            <Link className="hover:underline" href="#">
              Fairy Tale Fairways
            </Link>
            <Link className="hover:underline" href="#">
              Dreamscape Greens
            </Link>
            <Link className="hover:underline" href="#">
              Classic Mode
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link className="hover:underline" href="#">
              Blog
            </Link>
            <Link className="hover:underline" href="#">
              Community
            </Link>
            <Link className="hover:underline" href="#">
              Support
            </Link>
            <Link className="hover:underline" href="#">
              FAQs
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link className="hover:underline" href="#">
              Privacy Policy
            </Link>
            <Link className="hover:underline" href="#">
              Terms of Service
            </Link>
            <Link className="hover:underline" href="#">
              Cookie Policy
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Contact</h3>
            <Link className="hover:underline" href="#">
              Support
            </Link>
            <Link className="hover:underline" href="#">
              Sales
            </Link>
            <Link className="hover:underline" href="#">
              Partnerships
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
