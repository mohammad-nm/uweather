import Component, { PageEl } from "@/components/Libs/Component";
import Copy from "@/components/Libs/Copy";
import Router from "next/router";
import Window from "@/components/Libs/Window";
import InfoList from "@/components/Libs/InfoList";
import TextBox from "@/components/Libs/TextBox";
import Icon2Titles from "@/components/Libs/Icon2Titles";
import Icon3Titles from "@/components/Libs/Icon3Titles";

// https://irmapserver.ir/research/api/weather/
export default (p) => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {
  let styles = global.styles;
  let name = "خوش آمدید";

  return (
    <div style={{ direction: "ltr", minHeight: "11vh" }}>
      <br-x />
      <Window
        title={name}
        style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}
      >
        <div className="w-[460px] h-[920px] bg-custom-gradient  m-auto flex  font-customFont rounded-lg mt-7 box-content">
          <div className="text-8xl bg-clip-text text-transparent bg-custom-font w-full">
            <div className="w-full  flex flex-col ">
              <div className="mx-auto mt-10 text-9xl">{props.data.city}</div>
              <div className="flex flex-col">
                <div className="flex mx-auto items-center">
                  <div>{props.data.temp}°</div>
                  <div className="text-6xl pl-6"> {props.data.description}</div>
                </div>
                <div className="text-xl flex mx-auto">
                  <div>UV Index: {props.data.uvIndex}</div>
                  <div className="pl-8">Humidity: {props.data.humidity}</div>
                </div>
              </div>
            </div>

            <div className=" w-full h-min ">
              <InfoList weather={props.data.weather} />
            </div>
          </div>
        </div>
        ;
      </Window>
    </div>
  );
};

export async function getServerSideProps(context) {
  var session = await global.SSRVerify(context);
  var {
    uid,
    name,
    image,
    imageprop,
    lang,
    cchar,
    unit,
    workspace,
    servid,
    servsecret,
    usedquota,
    quota,
    quotaunit,
    status,
    regdate,
    expid,
    role,
    path,
    devmod,
    userip,
  } = session;

  let api = await fetch("https://irmapserver.ir/research/api/weather/");
  let res = await api.json();
  let data = {
    temp: res.current_condition[0].temp_C,
    humidity: res.current_condition[0].humidity,
    uvIndex: res.current_condition[0].uvIndex,
    description: res.current_condition[0].weatherDesc[0].value,
    city: res.nearest_area[0].areaName[0].value,
    weather: res.weather,
  };

  return {
    props: {
      data: global.QSON.stringify({
        session,
        data,
      }),
    },
  };
}
