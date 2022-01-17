
from os import path, walk, mkdir
import re
import time
import requests
import random
from concurrent.futures import ThreadPoolExecutor, as_completed


def gen_log(func):
    log_rt = r'./logs'
    def inner_func(self, *args):
        log_path = path.join(log_rt, func.__name__)
        if not path.exists(log_path):
            mkdir(log_path)
        
        with open(path.join(log_path, f"{time.strftime('%Y_%m_%d_%H:%M:%S')}.log"), 'w', encoding='utf-8') as f:  
            o = func(self, *args)
            f.write(o)   
    return inner_func

class CheckMD(object):

    headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    }
    proxies = {'http': None, 'https': None}

    requests.adapters.DEFAULT_RETRIES = 3
    requests.packages.urllib3.disable_warnings()

    def __get_file_lst():
        file_lst_ = []
        for i in walk(path.abspath(r'./source')):
            file_lst_  += [path.join(i[0], f) for f in i[2] if re.search(r'.(\.md|\.html)$', f) is not None ] 
        return file_lst_ 

    file_lst = __get_file_lst()


    def __init__(self) -> None:
        self.url_pattern = re.compile(r'\[.+?\]\(([^#].+?)\)')
        self.mermaid_pattern = None
        self.mathjax_pattern = None
        super().__init__()


    def __get_pattern(self, file_path, pattern_):
        match_lst = []
        with open(file_path, 'r', encoding='utf-8') as f:
            match_lst += pattern_.findall(f.read())
        return [(file_path, url) for url in match_lst]

    def __check_pattern_status(self, match):
        res = ''
        try:
            respon = requests.get(match[1], 
                                headers=CheckMD.headers,
                                proxies=CheckMD.proxies,
                                timeout=10, 
                                verify=False)
            if respon.status_code != requests.codes.ok:
                res +='\t'.join(list(match) + [str(respon.status_code)]) + '\n'
        except Exception as e:
            res += '\t'.join(list(match) + [str(e)]) + '\n'
        finally:
            time.sleep(random.randrange(1, 4))
        return res
        
    @gen_log
    def check_URL(self):
        result = ''

        with ThreadPoolExecutor() as pool:
            match_lst = pool.map(self.__get_pattern, CheckMD.file_lst, [self.url_pattern]*len(CheckMD.file_lst))
            match_lst = [i for item in match_lst for i in item ]

        with ThreadPoolExecutor() as pool:
            futures = [pool.submit(self.__check_pattern_status, i )for i in match_lst]
            for idx, future in enumerate(as_completed(futures)):
                schedule = (idx+1) / len(futures) * 100
                print("\rchecking process: {:.2f}%".format(schedule), end='')
                result += future.result()

        print(f'check finished')
        return ''.join(result)



    def check_MathJax(self):
        pass

    def check_mermaid(self):
        pass

if __name__ == '__main__':
    a = CheckMD().check_URL()