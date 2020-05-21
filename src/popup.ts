import * as $ from 'jquery';
  
import {
  Client,
  ClientState,
  Segment,
  Word
} from "@speechly/browser-client";

let clientState = ClientState.Disconnected;
let state = {
  searchUrl: ""
}

$(function() {
  chrome.storage.sync.get({
    speechly_app_id: '',
  }, function(items: {speechly_app_id}) {
    const appId = items.speechly_app_id;
    if (appId.length !== 36) {
      console.error("AppId " + items.speechly_app_id + " should be 36 character long but was " + appId.length)
      return
    }
    configureApp(appId)
  });
});

function configureApp(appId: string) {
  let client = new Client({
    appId: appId,
    language: "en-US"
  })

  $('#microphone').click(()=>{
    if (clientState === ClientState.Disconnected) {
      clientState = ClientState.Connecting;
      client.initialize((err?: Error) => {
        if (err !== undefined) {
          console.error('Failed to initialize Speechly client:', err)
        } else {
          clientState = ClientState.Connected;
          $('#microphone_button').removeClass("Microphone__button__inactive");
        }
      })
    }
  });
  
  $('#microphone').mousedown(() => {
    if (clientState === ClientState.Connected) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        state.searchUrl = tabs[0].url;
        const tabId = tabs[0].id;
        client.onSegmentChange((segment: Segment) => updateUrlOnSegmentUpdates(segment, tabId, state));

        $('#microphone_button').addClass("Microphone__button__active");
        // Start recording
        client.startContext((err?: Error) => {
          if (err !== undefined) {
            console.error('Failed to start recording:', err)
            return
          }
        })
      })
    }
  }).mouseup(() => {
    // Stop recording
    client.stopContext()
    $('#microphone_button').removeClass("Microphone__button__active");
  })
}

function updateWords(words: Word[]) {
  const transcriptDiv = document.getElementById(
    "transcript"
  ) as HTMLElement;

  transcriptDiv.innerHTML = words
    .map((word) => (word.isFinal ? `<b>${word.value}</b>` : word.value))
    .join(" ");
}

export function updateUrlOnSegmentUpdates(segment: Segment, tabId: number, state) {
  updateWords(segment.words)
  if (segment.intent.intent === "remove_filters") {
    const newUrl = clearFilters(state.searchUrl)
    if (state.searchUrl !== newUrl) {
      state.searchUrl = newUrl;
      chrome.tabs.update(tabId, {url: newUrl});
    }
    return
  }
  if (segment.intent.intent === "filter_product") {
    var newUrl = handleBrandEntities(segment, state.searchUrl)
    if (state.searchUrl !== newUrl) {
      state.searchUrl = newUrl;
      chrome.tabs.update(tabId, {url: newUrl});
    }
    return
  }

  if (segment.intent.intent === "filter_size") {
    var newUrl = handleSizeEntities(segment, state.searchUrl)
    if (state.searchUrl !== newUrl) {
      state.searchUrl = newUrl;
      chrome.tabs.update(tabId, {url: newUrl});
    }
    return
  }

  if (segment.intent.intent === "filter_colour") {
    var newUrl = handleColorEntities(segment, state.searchUrl)
    if (state.searchUrl !== newUrl) {
      state.searchUrl = newUrl;
      chrome.tabs.update(tabId, {url: newUrl});
    }
    return
  }
}

export function handleSizeEntities(segment: Segment, tabUrl: string) {
  const supportedSizes = {
    "SMALL":"1873",
    "MEDIUM":"1848",
    "LARGE":"1943"
  }
  return replaceEntityInUrl(segment, tabUrl, "size", supportedSizes)
}

export function handleBrandEntities(segment: Segment, tabUrl: string) {
  const supportedBrands = {
    "CALVIN KLEIN":"105,12507",
    "ADIDAS":"18,15723,16346,15913",
    "VANS":"765",
    "BOSS":"298,15672",
    "ASOS":"53,15643,15719,12919",
    "AMERICAN EAGLE":"16386",
    "ABERCROMBIE AND FITCH":"14370",
    "AJ Morgan":"13579",
    "ALBAM UTILITY":"16436",
    "ALLSAINTS":"12791",
    "ALPHA-H":"15393",
    "AMELIORATE":"14864",
    "ANATOMICALS":"4",
    "ANON":"15660",
    "ANOTHER INFLUENCE":"13762",
    "ARMANI EXCHANGE":"12136",
    "ASICS":"13688",
    "AVAIL LONDON": "15705",
    "BARBOUR":"12732",
    "BARBOUR BEACON":"15921",
    "BARBOUR INTERNATIONAL":"15715",
    "BERGHAUS":"12113",
    "BERSHKA":"15370",
    "BILLABONG":"3008",
    "BLOOD BROTHER":"13244",
    "BOOHOOMAN":"15632",
    "BRAVE SOUL":"13931",
    "BURTON MENSWEAR":"15155",
    "CARHARTT WIP":"3682",
    "CARHARTT":"3682",
    "CARROTS":"16280",
    "CELIO":"15095",
    "CHAMPION":"14513",
    "CHINATOWN MARKET":"16230",
    "COLLUSION":"15878",
    "COLUMBIA":"15059",
    "CONVERSE":"131",
    "CROOKED TONGUES":"13017",
    "DICKIES":"3253",
    "EMPORIO ARMANI":"14722,3060",
    "ELEMENT":"14403",
    "ELLESSE":"14116",
    "ESPRIT":"13529",
    "FARAH":"3497",
    "FILA":"202",
    "FIORUCCI":"12731",
    "FRED PERRY":"2943",
    "GOOD FOR NOTHING":"14490",
    "G-STAR":"3735",
    "HELLY HANSEN":"14334",
    "HOLLISTER":"14644",
    "HUF":"13652",
    "HUGO":"15139",
    "JACK AND JONES":"12461",
    "JORDAN":"14269",
    "KARL KANI":"16131",
    "LACOSTE":"391,12984,15497",
    "LEVI'S":"401,15503",
    "LEVIS":"401,15503",
    "LIQUOR N POKER":"14423",
    "LYLE AND SCOTT":"13073",
    "MENNACE":"15199",
    "NAPAPIJRI":"15127",
    "NEW BALANCE":"499",
    "NEW ERA":"3182",
    "NEW LOOK":"13817",
    "NICCE":"14468",
    "NIKE":"2986,15720,15176,13623,15783,15177",
    "OBEY":"14096",
    "ONE ABOVE ANOTHER":"15284",
    "ONLY AND SONS":"14441",
    "ORIGINAL PENGUIN":"527",
    "POLO RALPH LAUREN":"3594",
    "PS PAUL SMITH":"13872",
    "PULL AND BEAR":"14126",
    "PUMA":"589",
    "RECLAIMED VINTAGE":"12769",
    "REEBOK":"2988",
    "RELIGION":"608",
    "RIP N DIP":"15622",
    "RIVER ISLAND":"12983",
    "SANTA CRUZ":"14059",
    "SELECTED HOMME":"14159",
    "SEX SKATEBOARDS":"16281",
    "SIKSILK":"14164",
    "SIXTH JUNE":"14920",
    "TED BAKER":"712",
    "THE COUTURE CLUB":"15807",
    "THE NORTH FACE":"3312",
    "TOMMY HILFIGER":"3029",
    "TOMMY JEANS":"15631",
    "TOM TAILOR":"15489",
    "TOPMAN":"16236",
    "TWISTED TAILOR":"15831",
    "UNDER ARMOUR":"15203",
    "WEEKDAY":"14287"
  }
  return replaceEntityInUrl(segment, tabUrl, "brand", supportedBrands)
}

export function handleColorEntities(segment: Segment, tabUrl: string) {
  const supportedColors = {
    "RED":"1",
    "GREEN":"2",
    "PINK":"9",
    "BLUE":"3",
    "BEIGE":"25",
    "YELLOW":"6",
    "WHITE":"5",
    "BLACK":"4",
    "NAVY":"33",
    "GREY":"16",
    "MULTI":"17",
    "BROWN":"10",
    "STONE":"13",
    "SILVER":"12",
    "PURPLE":"8",
    "GOLD":"11",
    "TAN":"26",
    "ORANGE":"7",
    "CREAM":"20",
    "MAT":"29"
  }
  return replaceEntityInUrl(segment, tabUrl, "base_colour", supportedColors)
}

export function handleSortEntities(segment: Segment, tabUrl: string) {
  const supportedSorts = {
    "MOST EXPENSIVE":"pricedesc",
    "CHEAPEST":"priceasc"
  }
  const entities = segment.entities.filter(entity => entity.type === "sort");
  if (entities.length > 0 && entities[0].value in supportedSorts) {
    const newSort = "&sort=" + supportedSorts[entities[0].value] 
    const oldSort = getParamsSection(tabUrl, "sort")
    if (oldSort) {
      return tabUrl.replace(oldSort, newSort)
    } else {
      return tabUrl + newSort
    }
  }
  return tabUrl
}

export function replaceEntityInUrl(segment: Segment, tabUrl: string, entityName: string, supportedEntityValues) {
  const entities = segment.entities.filter(entity => entity.type === entityName);
  if (entities.length > 0 && entities[0].value in supportedEntityValues) {
    const newValue = entityName + ":" + supportedEntityValues[entities[0].value]
    const paramsSection = getParamsSection(tabUrl, "refine")
    if (!paramsSection) {
      return tabUrl + "&refine=" + newValue
    }
    const previousValues = paramsSection.match(new RegExp(entityName + ":\\d+")) || [];
    const newParams = (previousValues.length === 0) 
      ? paramsSection + "|" + newValue 
      : paramsSection.replace(previousValues[0], newValue);
    const newUrl = tabUrl.replace(paramsSection, newParams)
    return newUrl
  }
  return tabUrl
}

export function clearFilters(tabUrl: string) {
  return ["refine", "sort"].reduce((url, param) => {
    const params = getParamsSection(url, param)
    return url.replace(params, "")
  }, tabUrl)
}

/**
 * Matches the 'refine' section in url and excludes the last &, if it is there. 
 * 
 * @param tabUrl a string in form https://somedomain.net&refine=attribute_10155:6764|base_colour:5|size:2340|currentprice:5%3C95&something=true"
 */
export function getParamsSection(tabUrl: string, keyword: string) {
  const paramsSection = tabUrl.match(new RegExp("&" + keyword + "=.+?(&|$)"))
  if (!paramsSection) {
    return undefined
  }
  if (paramsSection.length == 2 && paramsSection[1].length > 0) {
    return paramsSection[0].slice(0, -1)
  } 
  return paramsSection[0]
}