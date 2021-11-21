
from os import path, walk, mkdir
import re
import time
import requests


# http://www.useragentstring.com/pages/useragentstring.php?name=Chrome  user agent 网站
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
}
proxies = {'http': None, 'https': None}
requests.adapters.DEFAULT_RETRIES = 5

source = path.abspath(r'./source')
log_rt = r'./logs'


def gen_log(func):
    def inner_func():
        log_path = path.join(log_rt, func.__name__)
        if not path.exists(log_path):
            mkdir(log_path)
        with open(path.join(log_path, time.strftime('%Y_%m_%d_%H:%M:%S', time.localtime(time.time()))+'.log'), 'w', encoding='utf-8') as f:
            f.write(func())   
    return inner_func

@gen_log
def check_url():
    check_lst = []
    result = ''
    # ssl._create_default_https_context = ssl._create_unverified_context

    for i in walk(source):
        check_lst += [path.join(i[0], f) for f in i[2] if re.search(r'.(\.md|\.html)$', f) is not None ]
    for i in check_lst:
        pattern = re.compile(r'\[.+?\]\(([^#].+?)\)')
        print('checking ', i, ' file')
        with open(i, 'r', encoding='utf-8') as f:
            max_connt = 2
            for line in f:
                url, cnt = pattern.search(line), 0
                if url is None:
                    continue
                while cnt <= max_connt:
                    try:
                        # 防止某些网站ssl失效或不信任
                        # https://www.cnblogs.com/liu-ke/p/14319803.html
                        requests.packages.urllib3.disable_warnings()
                        resp = requests.get(url.group(1), headers=headers,proxies=proxies,timeout=20, verify=False)
                        if resp.status_code != requests.codes.ok:
                            result +='\t'.join([i, url.group(1), str(resp.status_code)]) + '\n'
                        break
                    except Exception as e:
                        if cnt == max_connt:
                            result += '\t'.join([i, url.group(1), str(e)]) + '\n'
                        else:
                            time.sleep(3)
                        continue
                    finally:
                        cnt += 1
    return result

def check_MathJax():
    pass

def check_mermaid():
    pass


def gen_log():
    pass

if __name__ == '__main__':
    check_url()