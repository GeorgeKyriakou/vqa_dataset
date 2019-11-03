import os, sys

from keras.models import Model
from keras.layers import Input, LSTM, GRU, Dense, Embedding
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.utils import to_categorical
import numpy as np
import matplotlib.pyplot as plt

BATCH_SIZE = 64
EPOCHS = 20
LSTM_NODES =256
NUM_SENTENCES = 20000
MAX_SENTENCE_LENGTH = 50
MAX_NUM_WORDS = 20000
EMBEDDING_SIZE = 100

input_sentences = []
output_sentences = []
output_sentences_inputs = []

count = 0
for line in open(r'fra.txt', encoding="utf-8"):
    count += 1

    if count > NUM_SENTENCES:
        break

    if '\t' not in line:
        continue

    input_sentence = line.split('\t', 1)[0].strip()
    output = line.split('\t', 1)[-1].strip()
       
    output_sentence = output + ' <eos>'
    # print("The output is: ", output)
    # print("The outputsentence is: ", output_sentence) 
    output_sentence_input = '<sos> ' + output

    input_sentences.append(input_sentence)
    output_sentences.append(output_sentence)
    output_sentences_inputs.append(output_sentence_input)

print("num samples input:", len(input_sentences))
print("num samples output:", len(output_sentences))
print("num samples output input:", len(output_sentences_inputs))

print("Input sentence: ", input_sentences[172])
print("Output sentence: ", output_sentences[172])
print("inputOutput: ", output_sentences_inputs[172])