import numpy as np

import tensorflow as tf

import collections

from utils import *

file_path = './conversation_data/'

with open(file_path+'from.txt', 'r') as fopen:

text_from = fopen.read().lower().split('\n')

with open(file_path+'to.txt', 'r') as fopen:

text_to = fopen.read().lower().split('\n')

print('len from: %d, len to: %d' % (len(text_from), len(text_to)))

concat_from = ' '.join(text_from).split()

vocabulary_size_from = len(list(set(concat_from)))

data_from, count_from, dictionary_from, rev_dictionary_from = build_dataset(
    concat_from, vocabulary_size_from)

concat_to = ' '.join(text_to).split()

vocabulary_size_to = len(list(set(concat_to)))

data_to, count_to, dictionary_to, rev_dictionary_to = build_dataset(
    concat_to, vocabulary_size_to)

GO = dictionary_from['GO']

PAD = dictionary_from['PAD']

EOS = dictionary_from['EOS']

UNK = dictionary_from['UNK']
