const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');

require('dotenv').config();

const app = express();

app.use(morgan('tiny'));
app.use(cors());

//making request to the youtube server to get the list

//list of channels to go through: 고몽, 드림텔러, 빨강도깨비, 지무비, 리뷰엉이, 소개해주는남자, 백수골방, 발없는새, 리드무비, UTZI웃지, 김시선, 민호타우르스, 홍시네마, 품추남, NATAE나태, 스토리플레이어, 리플레이, 필름에빠지다, 달빛뮤즈, 미들뻔, 엔스, 리우군의다락방, 삐맨, 영준MovieReview, 뭅이, 팝콘트리, 김종철의익스트림무비, 자취방남자, 무비셀라, 로튼애플영화리뷰, 카랑, 홍시네마

let featuredChannelIds = ["UCpcft4FJXgUjnxWoQYsl7Ug", "UCpCiIDf9UrfRqte55FHWlYQ", "UCKNdfTZCJuOQfWN5Pe5UAAQ", "UCaHGOzOyeYzLQeKsVkfLEGA", "UCrBpV_pG2kyMMEHCMTNzjAQ", "UCBHXCaw_W6sxfgAB7rC-BYw", "UCNR3K4HA6LyO9tz0oZoSJIA", "UCiOWYRzOTiUYi9pJ-kscIKw", "UCU8H8oODmFTD2YqFvCCdQ6w", "UCLIgl1OnHngMxYkkNJ-uO5w", "UC79hJz6y1EEiIkwfHOuWC4w", "UCiiC3grOarOVIg5LZgXJnWw", "UCtwxuughKbSAV0e4bnz4ORg", "UC1XyzDex5AO3DHqRZTQIXJg", "UCQGTr4QurkCMJfVaZRiHB1Q", "UCilg-Dej9T4Swo-EbnLC4AA", "UCuStgIu_NAts1Kk3y0IydJA", "UCJfthTE-ACoZJPVgwyw_hsw", "UCMguxwveCsLVpyKrLz-EFTg", "UCsNH6vf07dmii61iZIhw_ww", "UC_Aly3X5CdojHdRDGmKi1ow", "UCJU6Tal7hGSu7MdAmKVuj-Q", "UCxlv4aOnrRTXMRSL8bVJqEw", "UCZVr7RZO2qgaB8LYNwc7kkQ", "UC8OTtjmmFp-NAypjj64ocmg", "UC_yhr_pEnNyY-hu-wEBXztQ", "UC2NdmlV9bI7R33e1124Ao1w", "UCDzpa0rTkUzxhE6h6fMKOQA", "UCmGsEXuAa0gL1uTm9Od_TYw", "UCX4K7Pf1yifbdlVDbk3_hgw", "UCcfz-8gGDYJfaRHYD7kkQpw", "UCtwxuughKbSAV0e4bnz4ORg", "UCxPsZyuVOLKMt-ze8I-hl_w"];



const channelUrl = 'https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UCpcft4FJXgUjnxWoQYsl7Ug%2CUCpCiIDf9UrfRqte55FHWlYQ%2CUCKNdfTZCJuOQfWN5Pe5UAAQ%2C+UCaHGOzOyeYzLQeKsVkfLEGA%2C+UCrBpV_pG2kyMMEHCMTNzjAQ%2CUCBHXCaw_W6sxfgAB7rC-BYw%2C+UCNR3K4HA6LyO9tz0oZoSJIA%2C+UCiOWYRzOTiUYi9pJ-kscIKw%2C+UCU8H8oODmFTD2YqFvCCdQ6w%2C+UCLIgl1OnHngMxYkkNJ-uO5w%2C+UC79hJz6y1EEiIkwfHOuWC4w%2C+UCiiC3grOarOVIg5LZgXJnWw%2C+UCtwxuughKbSAV0e4bnz4ORg%2C+UC1XyzDex5AO3DHqRZTQIXJg%2C+UCQGTr4QurkCMJfVaZRiHB1Q%2C+UCilg-Dej9T4Swo-EbnLC4AA%2C+UCuStgIu_NAts1Kk3y0IydJA%2C+UCJfthTE-ACoZJPVgwyw_hsw%2C+UCMguxwveCsLVpyKrLz-EFTg%2C+UCsNH6vf07dmii61iZIhw_ww%2C+UC_Aly3X5CdojHdRDGmKi1ow%2C+UCJU6Tal7hGSu7MdAmKVuj-Q%2C+UCxlv4aOnrRTXMRSL8bVJqEw%2C+UCZVr7RZO2qgaB8LYNwc7kkQ%2C+UC8OTtjmmFp-NAypjj64ocmg%2C+UC_yhr_pEnNyY-hu-wEBXztQ%2C+UC2NdmlV9bI7R33e1124Ao1w%2C+UCDzpa0rTkUzxhE6h6fMKOQA%2C+UCmGsEXuAa0gL1uTm9Od_TYw%2C+UCX4K7Pf1yifbdlVDbk3_hgw%2C+UCcfz-8gGDYJfaRHYD7kkQpw%2C+UCtwxuughKbSAV0e4bnz4ORg%2C+UCxPsZyuVOLKMt-ze8I-hl_w&maxResults=50&key=AIzaSyDd_NS5mL997mj4_FIOqJ6n9lZE8ZuJ2hA';

const uploadedVideoUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId';

//requests with channel ID, returns channel INFO
app.get('/channelinfo', (req, res) => {
    fetch(`${channelUrl}`)
        .then(response => response.json())
        .then(json => {
            let channelItems = [];
            json.items.forEach(item => {
                channelItems.push({
                    title: item.snippet.title,
                    channelDescription: item.snippet.description,
                    thumbnailURL: item.snippet.thumbnails.medium.url,
                    uploadPlaylistId: item.contentDetails.relatedPlaylists.uploads,
                    channelViewCount: item.statistics.viewCount,
                    channelSubscriberCount: item.statistics.subscriberCount,
                    videoCount: item.statistics.videoCount,
                });
            });
            /*   console.log(channelItems) OK;
             res.json(channelItems); OK */

            //fetching list of uploaded videos by requesting playlistitem.list API with uploadPlaylistId from channelItems.uploadPlaylistId
              for (i = 0; i < channelItems.length; i++) {
                 fetch(`${uploadedVideoUrl}=${channelItems[i].uploadPlaylistId}&key=AIzaSyDd_NS5mL997mj4_FIOqJ6n9lZE8ZuJ2hA`)
                     .then(response => response.json())
                     .then(json => {
                         channelItems[i].videoItems = [
                             {
                                 videoId: json[i].items.contentDetails.videoId,
                                 videoTitle: json[i].items.snippet.title,
                                 videoDescription: json[i].snippet.description,
                                 videoDate: json[i].contentDetails.videoPublishedAt
                             }
                         ]
                         
                     });
             }   //error cant set headers after they are sent

            //must replicate below result for every channelItems[i].uploadPlayListID

           /*  fetch(`${uploadedVideoUrl}=${channelItems[0].uploadPlaylistId}&key=AIzaSyDd_NS5mL997mj4_FIOqJ6n9lZE8ZuJ2hA`)
                .then(response => response.json())
                .then(json => {
                    channelItems[0].videoItems = [
                        {
                            videoId: json.items[0].contentDetails.videoId,
                            videoTitle: json.items[0].snippet.title,
                            videoDescription: json.items[0].snippet.description,
                            videoDate: json.items[0].contentDetails.videoPublishedAt
                        },
                        {
                            videoId: json.items[1].contentDetails.videoId,
                            videoTitle: json.items[1].snippet.title,
                            videoDescription: json.items[1].snippet.description,
                            videoDate: json.items[1].contentDetails.videoPublishedAt
                        }
                    ];
                    res.json(channelItems[0]);
                });
 */


        });
});

/* //Want Final json result be like below (channelItems)
[
    {
        "title": "뭅이",
        "channelDescription": "영화 리뷰하는 남자! 뭅이 입니다.\n\n제 리뷰는 저의 아주 주관적인 의견을 담고 있습니다.\n영화에 대한 절대적인 기준이 아니니까\n참고 또는 재미로만 봐주세요!!\n\n리뷰 잘 봐요!",
        "thumbnailURL": "https://yt3.ggpht.com/a-/AN66SAyYrjuMUrtDOIee-fl2yRVR68xJYQOuDsAf3A=s240-mo-c-c0xffffffff-rj-k-no",
        "uploadPlaylistId": "UU8OTtjmmFp-NAypjj64ocmg",
        "channelViewCount": "28402430",
        "channelSubscriberCount": "67734",
        "videoCount": "140",
        "videoItems": [
            {
                "videoId": "-j3BWeYZ1Mk",
                "videoTitle": "허당 탐정에게 사람 좀 찾아달랬더니...",
                "videoDescription": "실종사건을 조사하던 두 남자가 겪는 위험천만 코믹 수사극\n허당 탐정과 다혈질 파이터의 극과 극 케미가 돋보이는 영화\n‘나이스 가이즈 (The Nice Guys, 2016)’입니다\n\n재미도 있고 매력 있는 작품임에는 틀림이 없지만\n그놈의 자막이...\n\n참고로 어벤XX 인피XX 워와 같은 번역가는 아닙니다\n\n그리고 청불영화입니다!!\n\n#나이스가이즈#코믹#액션",
                "videoDate": "2018-09-29T01:30:07.000Z"
                
            },
            {
                "videoId": "W0dTuFrqbOA",
                "videoTitle": "현실조작 능력을 얻게 된 평범한 소녀",
                "videoDescription": "독실한 기독교 집안에서 자란 평범한 대학생 델마\n그녀는 아냐라는 친구와 만나며 자신에게 숨겨져 있던 초자연적인 힘을 깨닫게 되는데...\n델마는 신인가 마녀인가\n\n모든 것을 자신의 마음대로 바꿀 수 있는 소녀의 차가운 성장기\n영화 ‘델마 (Thelma, 2017)’\n\n영상에도 안내했지만\n스트로브 효과로 눈뽕을 장시간 당할 수 있는 영화 입니다\n관람에 주의하세요!!\n#델마#초능력#미스터리",
                "videoDate": "2018-09-22T01:30:02.000Z"
            }
            ...
        ]
    },


]
 */





//custom middleware for 404 handler
function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found');
    next(error);
}

//error handler
function errorHandler(error, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: error.message
    });
}





app.listen(3000, () => {
    console.log('listening on port 3000');
});