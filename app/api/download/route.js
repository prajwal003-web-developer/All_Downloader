
import { instagramGetUrl } from "instagram-url-direct";
import getFBInfo from "@xaviabot/fb-downloader";
import { rebelpindl } from "trs-media-downloader";
import ytdl from "@distube/ytdl-core";


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return Response.json({ error: "No URL provided" }, { status: 400 });
  }


  try {
    let result = {};

    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {

      const info = await ytdl.getInfo(url);

      const formats = info.formats

      const bestFormats = formats.filter((itm)=>itm.hasAudio && itm.hasVideo)

      bestFormats.sort((a, b) => {
            const hA = a.height || 0;
            const hB = b.height || 0;
            if (hA === hB) {
              return (b.bitrate || 0) - (a.bitrate || 0);
            }
            return hB - hA;
          });

  
     const format = bestFormats[0]
      result = {
        platform: "YouTube",
        download_link: format?.url || "",
      };
    }



    // Instagram
    else if (url.includes("instagram.com")) {
      console.log("Instagram")
      const data = await instagramGetUrl(url);
      result = { platform: "Instagram", download_link: data.url_list[0] };
    }

    // Facebook
    else if (url.includes("facebook.com")) {
      console.log("facebook")
      const data = await getFBInfo(url);
      result = {
        platform: "Facebook",
        sd: data.sd,
        hd: data.hd
      };
    }

    // Pinterest
    else if (url.includes("pinterest.com")) {
      console.log("pintrest")
      const data = await rebelpindl(url)
      result = {
        platform: "Pinterest",
        title: data.title,
        download_link: data.video?.hd || data.video?.sd || data.url || data.video
      };
    }

    else {
      console.log("here in Last")
      return Response.json({ error: "Unsupported platform" }, { status: 400 });
    }

    return Response.json(result);
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
