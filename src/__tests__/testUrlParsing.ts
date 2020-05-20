import {Segment} from "@speechly/browser-client";

import {getParamsSection, 
        handleSizeEntities, 
        handleBrandEntities, 
        replaceEntityInUrl,
        clearFilters
} from "../popup";

test('get params section', () => {
    const url = "https://www.asos.com/men/ctas/fashion-online-10/cat/?cid=13517&ctaref=hp|mw|prime|hero|1|edit|pastels&currentpricerange=5-140&refine=attribute_10155:6764|brand:18|size:2329&sort=pricedesc"
    const expected = "&refine=attribute_10155:6764|brand:18|size:2329"
    expect(getParamsSection(url, "refine")).toBe(expected);

    const url2 = "https://www.asos.com/men/ctas/fashion-online-10/cat/?cid=13517&currentpricerange=5-140&refine=size:2329"
    const expected2 = "&refine=size:2329"
    expect(getParamsSection(url2, "refine")).toBe(expected2);

    const url3 = "https://www.asos.com/men/new-in/cat/?cid=27110&currentpricerange=0-360&sort=pricedesc"
    const expected3 = "&sort=pricedesc"
    expect(getParamsSection(url3, "sort")).toBe(expected3);

    const url4 = "https://www.asos.com/men/new-in/cat/?cid=27110&currentpricerange=0-360"
    const expected4 = undefined;
    expect(getParamsSection(url4, "sort")).toBe(expected4);
});

test('handleSizeEntities when there is initial value', () => {
    const segment = {
        entities: [
            {
                endPosition: 5,
                isFinal: true,
                startPosition: 4,
                type: "size",
                value: "SMALL"
            }
        ]
    } as Segment;
    const url = "https://www.asos.com/men/ctas/fashion-online-10/cat/?cid=13517&ctaref=hp|mw|prime|hero|1|edit|pastels&currentpricerange=5-140&refine=attribute_10155:6764|brand:18|size:2329&sort=pricedesc"
    const expected = "https://www.asos.com/men/ctas/fashion-online-10/cat/?cid=13517&ctaref=hp|mw|prime|hero|1|edit|pastels&currentpricerange=5-140&refine=attribute_10155:6764|brand:18|size:1873&sort=pricedesc"    
    expect(handleSizeEntities(segment, url)).toBe(expected);
});

test('handleSizeEntities when there are no initial value', () => {
    const segment = {
        entities: [
            {
                endPosition: 5,
                isFinal: true,
                startPosition: 4,
                type: "size",
                value: "SMALL"
            }
        ]
    } as Segment;
    const url = "https://www.asos.com/men/ctas/fashion-online-10/cat/?cid=13517&ctaref=hp|mw|prime|hero|1|edit|pastels"
    const expected = "https://www.asos.com/men/ctas/fashion-online-10/cat/?cid=13517&ctaref=hp|mw|prime|hero|1|edit|pastels&refine=size:1873"    
    expect(handleSizeEntities(segment, url)).toBe(expected);
});

test('handleSizeEntities when there are no initial value', () => {
    const segment = {
        entities: [
            {
                endPosition: 5,
                isFinal: true,
                startPosition: 4,
                type: "size",
                value: "SMALL"
            },
            {
                endPosition: 5,
                isFinal: true,
                startPosition: 4,
                type: "brand",
                value: "CALVIN KLEIN"
            }
        ]
    } as Segment;
    const url = "https://www.asos.com/men/ctas/fashion-online-10/cat/?cid=13517&currentpricerange=5-140&refine=size:1873"
    const expected = "https://www.asos.com/men/ctas/fashion-online-10/cat/?cid=13517&currentpricerange=5-140&refine=size:1873|brand:105,12507"    
    expect(handleBrandEntities(segment, url)).toBe(expected);
});

test('replaceEntityInUrl', () => {
    const segment = {
        entities: [
            {
                endPosition: 5,
                isFinal: true,
                startPosition: 4,
                type: "size",
                value: "SMALL"
            },
            {
                endPosition: 5,
                isFinal: true,
                startPosition: 4,
                type: "brand",
                value: "CALVIN KLEIN"
            }
        ]
    } as Segment;
    const supportedBrands = {
        "CALVIN KLEIN": "292929"
    }
    const url = "https://www.asos.com/men/ctas/fashion-online-10/cat/?cid=13517&currentpricerange=5-140&refine=size:1873"
    const expected = "https://www.asos.com/men/ctas/fashion-online-10/cat/?cid=13517&currentpricerange=5-140&refine=size:1873|brand:292929"    
    expect(replaceEntityInUrl(segment, url, "brand", supportedBrands)).toBe(expected);
});

test('clearFilters', () => {
    const url = "https://domain.com&refine=size:1873&sort=anyvaluehere"
    const expected = "https://domain.com"    
    expect(clearFilters(url)).toBe(expected);
});