import axios from 'axios'
import querystring from "querystring"
import lru from "lru-cache"


const API_HOST = 'https://api.politicseq.com'
// const API_HOST = 'http://localhost:5000'

async function getArticles(params={}) {
	return axios.get(getApiUrl('articles', params), {headers: {
			"Cache-Control": "max-age=0",
			"Content-Type": "application/json"
	}}).then((res) => {
    return res.data.data
  });
}

function getApiUrl(resource, params={}) {
  return `${API_HOST}/api/${resource}/?${querystring.stringify(params)}`
}

async function getArticle(id, params={}) {
	return axios.get(`${API_HOST}/api/article/${id}?${querystring.stringify(params)}`, {headers: {
			"Cache-Control": "max-age=1000",
			"Content-Type": "application/json"
	}}).then((res) => {
    return res.data.data
  })
}

async function getEntities(params={}) {
	return axios.get(`${API_HOST}/api/entities/?${querystring.stringify(params)}`, {headers: {
			"Cache-Control": "max-age=1000",
			"Content-Type": "application/json"
	}})
}

async function getEntityArticles(key, params={}) {
	return axios.get(`${API_HOST}/api/entity/${key}/articles?${querystring.stringify(params)}`, {headers: {
			"Cache-Control": "max-age=1000",
			"Content-Type": "application/json"
	}})
}

async function getEntityMentions(key, params={}) {
	return axios.get(`${API_HOST}/api/entity/${key}/mentions?${querystring.stringify(params)}`, {headers: {
			"Cache-Control": "max-age=1000",
			"Content-Type": "application/json"
	}})
}

async function getChart(name, params={}) {
	return axios.get(`${API_HOST}/api/charts/${name}/?${querystring.stringify(params)}`, {headers: {
			"Cache-Control": "max-age=0",
			"Content-Type": "application/json"
	}})
}

async function getSources(params={}) {
	return axios.get(`${API_HOST}/api/sources?${querystring.stringify(params)}`, {headers: {
			"Cache-Control": "max-age=0",
			"Content-Type": "application/json"
	}})
}

async function getClusters() {
  return axios.get('https://politicseq-live.s3.amazonaws.com/all-clusters.json').then((data) => {
    return data.data;
  })
}

async function getLabels(params={}) {
	return axios.get(`${API_HOST}/api/labels/?${querystring.stringify(params)}`, {headers: {
			"Cache-Control": "max-age=1000",
			"Content-Type": "application/json"
	}})
}

async function getTrending(params={}) {
	return axios.get(`${API_HOST}/api/entities/trending?${querystring.stringify(params)}`, {headers: {
			"Cache-Control": "max-age=1000",
			"Content-Type": "application/json"
	}})
}

// class Cacher {
//   static cache;

//   get = (key, default_value = '') => {
//     if(self.cache[key]) {
//       return self.cache[key]
//     }
//   }

//   set = (key, data) => {

//   }
// }

export {
        API_HOST,
        getApiUrl,
        getArticles,
        getArticle,
        getChart,
        getClusters,
        getSources,
        getEntities,
        getEntityArticles,
        getEntityMentions,
        getLabels,
        getTrending
      };
// console.log(t.PEQ_API_URL + "/api/charts/trend_7_day/?" + querystring.stringify(params))
